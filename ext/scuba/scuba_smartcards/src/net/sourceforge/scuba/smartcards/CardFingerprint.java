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

import java.util.Properties;

/**
 * A fingerprint determines certain properties of a connected smart card.
 *
 * TODO: For long term: maybe turn this into some CardType like system similar to OCF?
 * 
 * @author Martijn Oostdijk (martijn.oostdijk@gmail.com)
 */
public interface CardFingerprint
{
	Properties guessProperties();
}
