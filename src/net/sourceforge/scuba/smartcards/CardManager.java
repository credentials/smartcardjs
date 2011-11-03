/*
 * SCUBA smart card framework.
 *
 * Copyright (C) 2009  The SCUBA team.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * $Id: $
 */

package net.sourceforge.scuba.smartcards;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.smartcardio.CardException;
import javax.smartcardio.CardTerminal;
import javax.smartcardio.CardTerminals;
import javax.smartcardio.CommandAPDU;
import javax.smartcardio.ResponseAPDU;
import javax.smartcardio.TerminalFactory;

/**
 * Manages all card terminals.
 * This is the source of card insertion and removal events.
 * Ideally this should be the only place where low level CardService
 * instances (such as {@link net.sourceforge.scuba.smartcards.TerminalCardService TerminalCardService})
 * are created.
 * 
 * @author Martijn Oostdijk (martijn.oostdijk@gmail.com)
 * @author Wojciech Mostowski (woj@cs.ru.nl)
 * @author Pim Vullers (pim@cs.ru.nl)
 * 
 * @version $Revision$
 */
public class CardManager
{
	private static final CardManager INSTANCE = new CardManager();
    private static final int FACTORY_POLL_INTERVAL = 950;
	private static final int TERMINAL_POLL_INTERVAL = 450;
    private static final Comparator<TerminalFactory> FACTORY_COMPARATOR = new Comparator<TerminalFactory>() {
        public int compare(TerminalFactory o1, TerminalFactory o2) {
            return ((TerminalFactory)o1).getType().compareToIgnoreCase(((TerminalFactory)o2).getType());
        }
    };
	private static final Comparator<CardTerminal> TERMINAL_COMPARATOR = new Comparator<CardTerminal>() {
		public int compare(CardTerminal o1, CardTerminal o2) {
			return ((CardTerminal)o1).getName().compareToIgnoreCase(((CardTerminal)o2).getName());
		}
	};

	private Map<TerminalFactory, FactoryPoller> factories;
	private Map<CardTerminal, TerminalPoller> terminals;
	private Collection<CardTerminalListener<CommandAPDU, ResponseAPDU>> cardTerminalListeners;
	private Collection<APDUListener<CommandAPDU, ResponseAPDU>> apduListeners;

	private Lock listenersLock;
	private Condition notWaitingForFirstListenerCondition;

	private CardManager() {	   
		try {
			cardTerminalListeners = new HashSet<CardTerminalListener<CommandAPDU, ResponseAPDU>>();
			apduListeners = new HashSet<APDUListener<CommandAPDU, ResponseAPDU>>();
			listenersLock = new ReentrantLock(true);
			notWaitingForFirstListenerCondition = listenersLock.newCondition();

			factories = new HashMap<TerminalFactory, FactoryPoller>();
			terminals = new HashMap<CardTerminal, TerminalPoller>();
			
			addFactories();
		} catch (Exception ex) {
			System.err.println("WARNING: exception while initialising");
			ex.printStackTrace();
		}
	}

	/**
     * Starts polling all registered factories and terminals (if not already doing so).
     */    
    public void startPolling() {
        for (TerminalFactory factory : getFactories()) {
            startPolling(factory);
        }
        for (CardTerminal terminal : getTerminals()) {
            startPolling(terminal);
        }
    }

    /**
     * Starts polling <code>factory</code> (if not already doing so).
     * 
     * @param factory a terminal factory
     */
    public void startPolling(TerminalFactory factory) {
        FactoryPoller poller = factories.get(factory);
        if (poller == null) { poller = new FactoryPoller(factory, this); }
        try {
            poller.startPolling();
        } catch (InterruptedException ie) {
            /* NOTE: if thread interrupted we just quit. */
        }
    }

	/**
	 * Starts polling <code>terminal</code> (if not already doing so).
	 * 
	 * @param terminal a card terminal
	 */
	public void startPolling(CardTerminal terminal) {
		TerminalPoller poller = terminals.get(terminal);
		if (poller == null) { poller = new TerminalPoller(terminal, this); }
		try {
			poller.startPolling();
		} catch (InterruptedException ie) {
			/* NOTE: if thread interrupted we just quit. */
		}
	}

	/**
     * Stops polling all registered factories and terminals
     */    
	public void stopPolling() {
        for (TerminalFactory factory : getFactories()) {
            stopPolling(factory);
        }
	    for (CardTerminal terminal : getTerminals()) {
	        stopPolling(terminal);
	    }
	}
	
    /**
     * Stops polling <code>factory</code>.
     * 
     * @param factory a terminal factory
     */
    public void stopPolling(TerminalFactory factory) {
        FactoryPoller poller = factories.get(factory);
        if (poller == null) { return; }
        try {
            poller.stopPolling();
        } catch (InterruptedException ie) {
            /* NOTE: if thread interrupted we just quit. */
        }
    }
    
    /**
	 * Stops polling <code>terminal</code>.
	 * 
	 * @param terminal a card terminal
	 */
	public void stopPolling(CardTerminal terminal) {
		TerminalPoller poller = terminals.get(terminal);
		if (poller == null) { return; }
		try {
			poller.stopPolling();
		} catch (InterruptedException ie) {
			/* NOTE: if thread interrupted we just quit. */
		}
	}	

    /**
     * Whether we are polling <code>factory</code>.
     *
     * @param factory a terminal factory
     *
     * @return a boolean
     */
    public boolean isPolling(TerminalFactory factory) {
        FactoryPoller poller = factories.get(factory);
        if (poller == null) { return false; }
        return poller.isPolling();
    }

    /**
	 * Whether we are polling <code>terminal</code>.
	 *
	 * @param terminal a card terminal
	 *
	 * @return a boolean
	 */
	public boolean isPolling(CardTerminal terminal) {
		TerminalPoller poller = terminals.get(terminal);
		if (poller == null) { return false; }
		return poller.isPolling();
	}

    /**
     * Whether the card manager is running.
     * 
     * @return a boolean indicating whether the card manager is running.
     */
    public boolean isPolling() {
        boolean isPolling = false;
        
        for (TerminalFactory factory: factories.keySet()) {
            isPolling ^= isPolling(factory);
        }
        for (CardTerminal terminal: terminals.keySet()) {
            isPolling ^= isPolling(terminal);
        }

        return isPolling;
    }

	private void addFactories() {
	    addFactory(TerminalFactory.getDefault(), true);
	}
	
    /**
     * Adds a factory.
     *
     * @param terminal the card terminal to add
     * @param isPolling whether we should immediately start polling this terminal
     */
    public void addFactory(TerminalFactory factory, boolean isPolling) {
        FactoryPoller poller = factories.get(factory);
        if (poller == null) {
            poller = new FactoryPoller(factory, this);
            factories.put(factory, poller);
        }
        if (isPolling && !isPolling(factory)) {
            startPolling(factory);
        }
        if (!isPolling && isPolling(factory)) {
            stopPolling(factory);
        }
    }
    
	/**
	 * Adds the terminals produced by <code>factory</code>.
	 *
	 * @param factory
	 * @return the number of terminals added
	 */
	public int addTerminals(TerminalFactory factory, boolean isPolling) {
		try {
			CardTerminals additionalTerminals = factory.terminals();
			if (additionalTerminals == null) { return 0; }
			List<CardTerminal> additionalTerminalsList = additionalTerminals.list();
			if (additionalTerminalsList == null) { return 0; }
			List<CardTerminal> terminalsList = new ArrayList<CardTerminal>();
			terminalsList.addAll(additionalTerminalsList);
			for (CardTerminal terminal: terminalsList) {
				addTerminal(terminal, isPolling);
			}
			return additionalTerminalsList.size();
		} catch (CardException cde) {
			/* NOTE: Listing of readers failed. Don't add anything. */
		}
		return 0;
	}

	/**
	 * Adds a terminal.
	 *
	 * @param terminal the card terminal to add
	 * @param isPolling whether we should immediately start polling this terminal
	 */
	public void addTerminal(CardTerminal terminal, boolean isPolling) {
		TerminalPoller poller = terminals.get(terminal);
		if (poller == null) {
			poller = new TerminalPoller(terminal, this);
			terminals.put(terminal, poller);
		}
		if (isPolling && !isPolling(terminal)) {
			startPolling(terminal);
		}
		if (!isPolling && isPolling(terminal)) {
			stopPolling(terminal);
		}
	}

	/**
	 * Adds a listener.
	 * 
	 * @param l the listener to add
	 */
	public void addCardTerminalListener(CardTerminalListener<CommandAPDU, ResponseAPDU> l) {
		listenersLock.lock();
		try {
			cardTerminalListeners.add(l);
			notWaitingForFirstListenerCondition.signalAll();
		} finally {
			listenersLock.unlock();
		}
	}

	/**
	 * Removes a listener.
	 * 
	 * @param l the listener to remove
	 */
	public void removeCardTerminalListener(CardTerminalListener<CommandAPDU, ResponseAPDU> l) {
		cardTerminalListeners.remove(l);
	}

	/**
	 * Adds a listener.
	 * 
	 * @param l the listener to add
	 */
	public void addAPDUListener(APDUListener<CommandAPDU, ResponseAPDU> l) {
		apduListeners.add(l);
		for (CardTerminal terminal: terminals.keySet()) {
			TerminalPoller poller = terminals.get(terminal);
			if (poller != null) {
				CardService<CommandAPDU, ResponseAPDU> service = poller.getService();
				if (service != null) {
					service.addAPDUListener(l);
				}
			}
		}
	}

	/**
	 * Removes a listener.
	 * 
	 * @param l the listener to remove
	 */
	public void removeAPDUListener(APDUListener<CommandAPDU, ResponseAPDU> l) {
		apduListeners.remove(l);
		for (CardTerminal terminal: terminals.keySet()) {
			TerminalPoller poller = terminals.get(terminal);
			if (poller != null) {
				CardService<CommandAPDU, ResponseAPDU> service = poller.getService();
				if (service != null) {
					service.removeAPDUListener(l);
				}
			}
		}
	}

	private void notifyCardEvent(final CardEvent<CommandAPDU, ResponseAPDU> ce) {
		for (final CardTerminalListener<CommandAPDU, ResponseAPDU> l : cardTerminalListeners) { 
			(new Thread(new Runnable() {
				public void run() {
					switch (ce.getType()) {
					case CardEvent.INSERTED: l.cardInserted(ce); break;
					case CardEvent.REMOVED: l.cardRemoved(ce); break;
					}	
				}
			})).start();
		}
	}

	private boolean hasNoListeners() {
		return cardTerminalListeners.isEmpty();
	}

	/**
     * Gets a list of factories.
     * 
     * @return a list of factories
     */
    public List<TerminalFactory> getFactories() {
        List<TerminalFactory> result = new ArrayList<TerminalFactory>();
        result.addAll(factories.keySet());
        Collections.sort(result, FACTORY_COMPARATOR);
        return result;
    }
    
	/**
	 * Gets a list of terminals.
	 * 
	 * @return a list of terminals
	 */
	public List<CardTerminal> getTerminals() {
		List<CardTerminal> result = new ArrayList<CardTerminal>();
		result.addAll(terminals.keySet());
		Collections.sort(result, TERMINAL_COMPARATOR);
		return result;
	}

    /**
     * Gets the service associated with <code>terminal</code> (or <code>null</code> if
     * we are not polling <code>terminal</code>).
     *
     * @param terminal a card terminal
     *
     * @return a card service or <code>null</code>
     */
    public CardService<CommandAPDU, ResponseAPDU> getService(CardTerminal terminal) {
        TerminalPoller poller = terminals.get(terminal);
        if (poller == null) { return null; }
        CardService<CommandAPDU, ResponseAPDU> service = poller.getService();
        return service;
    }

	public String toString() {
		StringBuffer result = new StringBuffer();
		result.append("CardManager: [");
		boolean first = true;
		for (CardTerminal terminal: terminals.keySet()) {
			result.append((first ? "" : ", ") + terminals.get(terminal));
			if (first) { first = false; }
		}
		result.append("]");
		return result.toString();
	}

	/**
	 * Gets the card manager.
	 * By default only PC/SC terminals are added,
	 * use {@link #addTerminals(TerminalFactory,boolean)} to add additional terminals.
	 * 
	 * @return the card manager
	 */
	public static CardManager getInstance() {
		return INSTANCE;
	}

	   
    private class FactoryPoller implements Runnable 
    {
        private CardManager cm;
        private TerminalFactory factory;
        private boolean isPolling, hasStoppedPolling;
        private Thread myThread;

        private Lock pollingLock;
        private Condition startedPollingCondition, stoppedPollingCondition;

        public FactoryPoller(TerminalFactory factory, CardManager cm) {
            this.factory = factory;
            this.isPolling = false;
            this.hasStoppedPolling = true;
            this.cm = cm;
            this.pollingLock = new ReentrantLock(true);
            stoppedPollingCondition = pollingLock.newCondition();
            startedPollingCondition = pollingLock.newCondition();
        }

        public boolean isPolling() {
            return isPolling;
        }

        public void startPolling() throws InterruptedException {
            pollingLock.lock();
            try {
                if (isPolling) { return; }
                isPolling = true;
                if (myThread != null && myThread.isAlive()) { return; }
                myThread = new Thread(this);
                myThread.start();
                while (isPolling && hasStoppedPolling) {
                    startedPollingCondition.await();
                }
            } finally {
                pollingLock.unlock();
            }
        }

        public void stopPolling() throws InterruptedException {
            pollingLock.lock();
            try {
                if (!isPolling) { return; }
                isPolling = false;

                /* Wake up threads waiting for first listener. */
                listenersLock.lock();
                try {
                    notWaitingForFirstListenerCondition.signalAll();
                } finally {
                    listenersLock.unlock();
                }

                if (myThread == null || !myThread.isAlive()) { return; }
                
                /* Wait until thread has stopped polling. */
                while (!isPolling && !hasStoppedPolling) {
                    stoppedPollingCondition.await();
                }
                myThread = null;
            } finally {
                pollingLock.unlock();
            }
        }

        public void run() {
            pollingLock.lock();
            try {
                hasStoppedPolling = false;
                startedPollingCondition.signalAll();
            } finally {
                pollingLock.unlock();
            }
            try {
                while (isPolling) {
                    /* If Card Manager has no listeners, we go to sleep. */
                    listenersLock.lock();
                    try {
                        while (isPolling && cm.hasNoListeners()) {
                            notWaitingForFirstListenerCondition.await();
                        }
                    } finally {
                        listenersLock.unlock();
                    }
                    
                    pollingLock.lock();
                    try {
                        try {
                            if (!isPolling) { break; }
                            CardTerminals additionalTerminals = factory.terminals();
                            if (additionalTerminals == null) { continue; }
                            List<CardTerminal> terminalsList = additionalTerminals.list();
                            if (terminalsList == null) { continue; }
                            
                            for (CardTerminal terminal: terminalsList) {
                                if (!cm.terminals.containsKey(terminal)) {
                                    addTerminal(terminal, isPolling);
                                }
                            }
                            
                            Thread.sleep(FACTORY_POLL_INTERVAL);                            
                        } catch (CardException ce) {
                            ce.printStackTrace(); // for debugging
                        }
                    } finally {
                        pollingLock.unlock();
                    }
                }

                pollingLock.lock();
                try {
                    hasStoppedPolling = true;
                    stoppedPollingCondition.signalAll();
                } finally {
                    pollingLock.unlock();
                }
            } catch (InterruptedException ie) { 
                /* NOTE: interrupt, we quit. */
                // ie.printStackTrace();
            }
        }

        public String toString() {
            return "Poller for " + factory.getType() + (isPolling ? " (polling)" : " (not polling)");
        }
    }

	private class TerminalPoller implements Runnable
	{
		private CardManager cm;
		private CardTerminal terminal;
		private TerminalCardService service;
		private boolean isPolling, hasStoppedPolling;
		private Thread myThread;

		private Lock pollingLock;
		private Condition startedPollingCondition, stoppedPollingCondition;

		public TerminalPoller(CardTerminal terminal, CardManager cm) {
			this.terminal = terminal;
			this.service = null;
			this.isPolling = false;
			this.hasStoppedPolling = true;
			this.cm = cm;
			this.pollingLock = new ReentrantLock(true);
			stoppedPollingCondition = pollingLock.newCondition();
			startedPollingCondition = pollingLock.newCondition();
		}

		public boolean isPolling() {
			return isPolling;
		}

		public void startPolling() throws InterruptedException {
			pollingLock.lock();
			try {
				if (isPolling) { return; }
				isPolling = true;
				if (myThread != null && myThread.isAlive()) { return; }
				myThread = new Thread(this);
				myThread.start();
				while (isPolling && hasStoppedPolling) {
					startedPollingCondition.await();
				}
			} finally {
				pollingLock.unlock();
			}
		}

		public void stopPolling() throws InterruptedException {
			pollingLock.lock();
			try {
				if (!isPolling) { return; }
				isPolling = false;

				/* Wake up threads waiting for first listener. */
				listenersLock.lock();
				try {
					notWaitingForFirstListenerCondition.signalAll();
				} finally {
					listenersLock.unlock();
				}

				if (myThread == null || !myThread.isAlive()) { return; }
				
				/* Wait until thread has stopped polling. */
				while (!isPolling && !hasStoppedPolling) {
					stoppedPollingCondition.await();
				}
				myThread = null;
			} finally {
				pollingLock.unlock();
			}
		}

		public CardService<CommandAPDU, ResponseAPDU> getService() {
			return service;
		}

		public void run() {
			pollingLock.lock();
			try {
				hasStoppedPolling = false;
				startedPollingCondition.signalAll();
			} finally {
				pollingLock.unlock();
			}
			try {
				while (isPolling) {
					/* If Card Manager has no listeners, we go to sleep. */
					listenersLock.lock();
					try {
						while (isPolling && cm.hasNoListeners()) {
							notWaitingForFirstListenerCondition.await();
						}
					} finally {
						listenersLock.unlock();
					}
					
					pollingLock.lock();
					try {
						try {
							if (!isPolling) { break; }

							boolean wasCardPresent = false;
							boolean isCardPresent = false;
							long currentTime = System.currentTimeMillis();
							if (service != null) {
								wasCardPresent = true;
							} else {
								try {
									if (terminal.isCardPresent()) {
										service = new TerminalCardService(terminal);
										for (APDUListener<CommandAPDU, ResponseAPDU> l: cm.apduListeners) { service.addAPDUListener(l); }
									}
								} catch (Exception e) {
									if (service != null) { service.close(); }
								}
							}
							if (service != null && (currentTime - service.getLastActiveTime() < TERMINAL_POLL_INTERVAL)) {
								isCardPresent = true;
							} else {
								isCardPresent = terminal.isCardPresent();
							}
							if (wasCardPresent && !isCardPresent) {
								if (service != null) {
									final CardEvent<CommandAPDU, ResponseAPDU> ce = new CardEvent<CommandAPDU, ResponseAPDU>(CardEvent.REMOVED, service);
									notifyCardEvent(ce);
									service.close();
								}
								service = null;
							} else if (!wasCardPresent && isCardPresent) {
								if (service != null) {
									final CardEvent<CommandAPDU, ResponseAPDU> ce = new CardEvent<CommandAPDU, ResponseAPDU>(CardEvent.INSERTED, service);
									notifyCardEvent(ce);
								}
							}

							// // This doesn't seem to work on some variants of Linux + pcsclite. :(
							//		if (isCardPresent) {
							//			terminal.waitForCardAbsent(TERMINAL_POLL_INTERVAL); // or longer..
							//		} else {
							//			terminal.waitForCardPresent(TERMINAL_POLL_INTERVAL); // or longer..
							//		}
							// // ... so we'll just sleep for a while as a courtesy to other threads...
							Thread.sleep(TERMINAL_POLL_INTERVAL);
						} catch (CardException ce) {
							/* FIXME: what if reader no longer connected, should we remove it from list? */
							ce.printStackTrace(); // for debugging
						} finally {
							if (!isPolling && service != null) { service.close(); }
						}
					} finally {
						pollingLock.unlock();
					}
				}

				pollingLock.lock();
				try {
					hasStoppedPolling = true;
					stoppedPollingCondition.signalAll();
				} finally {
					pollingLock.unlock();
				}
			} catch (InterruptedException ie) { 
				/* NOTE: interrupt, we quit. */
				// ie.printStackTrace();
			}
		}

		public String toString() {
			return "Poller for " + terminal.getName() + (isPolling ? " (polling)" : " (not polling)");
		}
	}
}
