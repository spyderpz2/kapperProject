-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 30 okt 2019 om 12:00
-- Serverversie: 5.7.14
-- PHP-versie: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `knappekappers`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `chair` int(11) NOT NULL,
  `date` date NOT NULL,
  `hairdresserId` int(11) NOT NULL,
  `treatmentId` int(11) NOT NULL,
  `starttime` int(11) NOT NULL,
  `endtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `agenda`
--

INSERT INTO `agenda` (`id`, `chair`, `date`, `hairdresserId`, `treatmentId`, `starttime`, `endtime`) VALUES
(24, 2, '2019-09-02', 2, 2, 14, 19);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `hairdresser`
--

CREATE TABLE `hairdresser` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `hairdresser`
--

INSERT INTO `hairdresser` (`id`, `name`) VALUES
(1, 'Monica'),
(2, 'Erica'),
(3, 'Rita'),
(4, 'Tina'),
(5, 'Sandra'),
(6, 'Mary'),
(7, 'Jessica');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `treatment`
--

CREATE TABLE `treatment` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `treatment`
--

INSERT INTO `treatment` (`id`, `name`, `duration`, `description`) VALUES
(1, 'Knippen - man', 2, 'Knipbeurt voor mannen'),
(2, 'Knippen - vrouwen', 2, 'Knipbeurt voor vrouwen');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hairdresserId` (`hairdresserId`),
  ADD KEY `treatmentId` (`treatmentId`);

--
-- Indexen voor tabel `hairdresser`
--
ALTER TABLE `hairdresser`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT voor een tabel `hairdresser`
--
ALTER TABLE `hairdresser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `treatment`
--
ALTER TABLE `treatment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`treatmentId`) REFERENCES `treatment` (`id`),
  ADD CONSTRAINT `agenda_ibfk_2` FOREIGN KEY (`hairdresserId`) REFERENCES `hairdresser` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
