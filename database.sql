-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : Dim 25 oct. 2020 à 20:56
-- Version du serveur :  8.0.21-0ubuntu0.20.04.4
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `database`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisements`
--

CREATE TABLE `advertisements` (
  `ad_id` tinyint NOT NULL,
  `ad_title` text NOT NULL,
  `ad_pubdate` date NOT NULL,
  `ad_startdate` date NOT NULL,
  `ad_mission` text NOT NULL,
  `ad_jobtype` varchar(255) NOT NULL,
  `ad_wage` text NOT NULL,
  `ad_wantedprofil` text NOT NULL,
  `co_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `advertisements`
--

INSERT INTO `advertisements` (`ad_id`, `ad_title`, `ad_pubdate`, `ad_startdate`, `ad_mission`, `ad_jobtype`, `ad_wage`, `ad_wantedprofil`, `co_id`) VALUES
(2, 'Développeur Frontend React.js Senior - H/F', '2020-09-30', '2020-12-12', 'Vous rejoindrez l’équipe de développement, constituée de personnes talentueuses et chevronnées, et travaillerez sur de nombreux sujets :\r\n\r\n    \n développement d’une application web React.js multitenants\r\n    \n création de nouveaux composants, définition de guidelines\r\n    \n coordination avec les designers UI / UX pour transformer efficacement les maquettes en code\r\n    \n amélioration de l’expérience utilisateur (mise en place d’A/B testing, analyse et exploitation des résultats)\r\n    \n expérimentation de nouvelles idées avec des prototypes rapides\r\n    \n surveillance et amélioration des performances frontend en production', 'CDI', 'entre 40K € et 55K €', 'Expérience minimum de 2 ans avec React.js\r\nTrès bonne maîtrise de JavaScript (ES6), HTML, CSS\n\r\nPassionné(e) par le code\n\r\nAttrait pour le UI / UX\n\r\nRigoureux-(se) dans l’écriture du code, Créatif-(ve) dans la résolution de problèmes\n\r\nBonne communication, capacité à travailler en équipe ', 2),
(3, 'Developpeur Web', '2020-10-07', '2020-10-30', 'Vous rejoindrez l’équipe de développement.', 'Alternance', 'entre 40K € et 55K €', 'Expérience minimum de 2 ans avec React.jsTrès bonne maîtrise de JavaScript (ES6), HTML, CSSPassionné(e) par le codeAttrait pour le UI / UXRigoureux-(se) dans l’écriture du code`;', 2),
(4, 'Developpeur React', '2020-10-26', '2020-11-28', 'Le canidat idéal est un résolveur de problèmes créatif qui travaillera en coordination avec des équipes interfonctionnelles pour concevoir, développer et maintenir nos sites Web et outils Web de prochaine génération. Vous devez être à l\'aise de travailler en équipe tout en prenant l\'initiative de prendre la tête de nouvelles innovations et de nouveaux projets.', 'CDI', 'entre 30K € et 35K €', 'Au moins 3 à 4 ans d\'expérience en HTML, CSS et JavaScript  Maîtrise des technologies côté serveur obligatoires Java, PHP, NodeJS, Angular', 2),
(5, 'Developpeur Web', '2020-09-30', '2020-10-28', 'developpement web', 'CDI', '2100€/mois', 'HTML/CSS: 3 ans (Souhaité) - Informatique: 3 ans (Souhaité) - Développement Web: 3 ans (Souhaité)', 4);

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

CREATE TABLE `applications` (
  `app_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `message` varchar(300) NOT NULL,
  `ad_id` tinyint NOT NULL,
  `pe_id` tinyint DEFAULT NULL,
  `co_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `applications`
--

INSERT INTO `applications` (`app_id`, `first_name`, `last_name`, `email`, `phone`, `message`, `ad_id`, `pe_id`, `co_id`) VALUES
(10, 'Pierre', 'Paul', 'pp@gmail.com', '76567', 'zertyuio', 2, 23, 2),
(12, 'Jessica', 'azert', 'az@aze.com', '987789', 'poiuy', 2, NULL, 2),
(13, 'Camille', 'Vacant', 'camille@gmail.com', '0123456789', 'Test', 2, NULL, 2),
(14, 'Test', 'Test', 'test@t', '645351', 'lkzeqnf', 2, NULL, 2),
(15, 'Camille', 'Vacant', 'camille@gmail.com', '06843512', '<ikgu', 2, 28, 2),
(18, 'Camille', 'Test', 'camille2@gmail.com', '0123456789', 'Candidature', 2, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `co_id` int NOT NULL,
  `co_name` text NOT NULL,
  `co_address` text NOT NULL,
  `co_CP` int NOT NULL,
  `co_city` varchar(50) NOT NULL,
  `co_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`co_id`, `co_name`, `co_address`, `co_CP`, `co_city`, `co_description`) VALUES
(2, 'Kicklox', '34 rue Verlet Hanus', 69003, 'Lyon', 'Depuis 2016, Kicklox aide talents tech et entreprises industrielles à se rencontrer et collaborer sur des projets innovants'),
(3, 'SA Développement', '8 chemin des pierres', 69003, 'Lyon', 'Description de l\'entreprise'),
(4, 'Devstar', '62 boulevard baron du marais', 69110, 'Ste foy les lyon', 'Entreprise de développement Web'),
(5, 'Nouvelle Entreprise', '2 rue du Sauveur', 63800, 'Clermont-Ferrand', 'Nouvelle entreprise'),
(6, 'Peuples et Montagnes du Mékong', '79 rue Francis Baulier', 42100, 'Saint-Etienne', 'Association d\'aide des minorités ethniques du Laos au niveau de la santé.'),
(7, 'Tech Company', '8 rue des Gras', 69005, 'Lyon', 'Entreprise du secteur Tech.');

-- --------------------------------------------------------

--
-- Structure de la table `information`
--

CREATE TABLE `information` (
  `in_id` tinyint NOT NULL,
  `in_mailsent` varchar(20) NOT NULL,
  `ad_id` tinyint NOT NULL,
  `co_id` int NOT NULL,
  `pe_id` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `people`
--

CREATE TABLE `people` (
  `pe_id` tinyint NOT NULL,
  `pe_fname` varchar(20) NOT NULL,
  `pe_lname` varchar(20) NOT NULL,
  `pe_email` varchar(50) NOT NULL,
  `pe_password` varchar(200) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `people`
--

INSERT INTO `people` (`pe_id`, `pe_fname`, `pe_lname`, `pe_email`, `pe_password`, `isAdmin`) VALUES
(22, 'Florent', 'Milan', 'florentmilan20@gmail.com', '$2b$10$Cg8X3ant.hzjnSO97CmIg.FNfe/lmZWanCRhiZOEalWMAj3RUA3Pu', 1),
(23, 'Pierre', 'Paul', 'pp@gmail.com', '$2b$10$DDwum7MfH95JYFCcZ122F.o3oaZXj2FQeTpEfQp8PkICLNSIlf4Me', 0),
(25, 'Dupond', 'Mélissa', 'mel@test.com', '$2b$10$zx2JlBnP3ymM2/J0PQeHiuNTBRUFIhnaICJcsvsO48KcwmcQdLu4a', 0),
(26, 'Daniel', 'Martin', 'daniel.martin@yahoo.com', '$2b$10$BOFaDdJjxYIqcrBqkcjVDekfcBmjhuejf5aob3slLca3KmAhOtWCq', 0),
(27, 'Jessica', 'azer', 'azer@azer.com', '$2b$10$TXXY9wbp69KQpg.7XrMPje.qLxtJTDr2pW1uOhxsVYbrocA0p.AG6', 0),
(28, 'Camille', 'Vacant 2', 'camille@gmail.com', '$2b$10$B17J9bDwS5bJOhmglBVhpu9uFbheq4bL5BYFCtGppck.Dl/hxED92', 0),
(30, 'Admin', 'Admin', 'admin@jobboard.com', '$2b$10$mAm49uAy7hOtwC7byXyATuOryDdgvch.B.sj3lwic8A7pyJJM1sq2', 1),
(32, 'Camille', 'Nouveau', 'camille2@gmail.com', '$2b$10$kwCks5oRB1S2TvUTJ.fChuE0sxdHL7lCYeir04cqAFJX6Hk7S2U0K', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`ad_id`),
  ADD KEY `co_id` (`co_id`);

--
-- Index pour la table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`app_id`),
  ADD KEY `ad_id` (`ad_id`),
  ADD KEY `pe_id` (`pe_id`),
  ADD KEY `co_id` (`co_id`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`co_id`);

--
-- Index pour la table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`in_id`),
  ADD KEY `ad_id` (`ad_id`),
  ADD KEY `co_id` (`co_id`),
  ADD KEY `pe_id` (`pe_id`);

--
-- Index pour la table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`pe_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `ad_id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `applications`
--
ALTER TABLE `applications`
  MODIFY `app_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `co_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `information`
--
ALTER TABLE `information`
  MODIFY `in_id` tinyint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `people`
--
ALTER TABLE `people`
  MODIFY `pe_id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD CONSTRAINT `advertisements_ibfk_1` FOREIGN KEY (`co_id`) REFERENCES `companies` (`co_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`ad_id`) REFERENCES `advertisements` (`ad_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`pe_id`) REFERENCES `people` (`pe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applications_ibfk_3` FOREIGN KEY (`co_id`) REFERENCES `companies` (`co_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `information`
--
ALTER TABLE `information`
  ADD CONSTRAINT `information_ibfk_1` FOREIGN KEY (`ad_id`) REFERENCES `advertisements` (`ad_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `information_ibfk_2` FOREIGN KEY (`pe_id`) REFERENCES `people` (`pe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `information_ibfk_3` FOREIGN KEY (`co_id`) REFERENCES `companies` (`co_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
