insert into public.role_permissions (role, permission) values ('sa', 'events.see.hidden');
insert into public.role_permissions (role, permission) values ('sa', 'users.ban');

-- Worlds
insert into public.worlds (name, description, color, state) values ('Léïm', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet congue aliquet. Curabitur eu iaculis diam. Nunc iaculis nibh orci, eu semper nunc congue congue. Praesent euismod tortor eget metus tristique lobortis vel in risus. In volutpat ligula orci, id pharetra lectus egestas at.', 'black', 'published');

-- Character categories
insert into public.character_categories (name, color, world_id) values ('Joueur', 'white', 1);
insert into public.character_categories (name, color, world_id) values ('Comte', 'emerald', 1);
insert into public.character_categories (name, color, world_id) values ('Scientifique', 'indigo', 1);
insert into public.character_categories (name, color, world_id) values ('Mage', 'cyan', 1);
insert into public.character_categories (name, color, world_id) values ('Professeur', 'teal', 1);
insert into public.character_categories (name, color, world_id) values ('Criminel', 'rose', 1);
insert into public.character_categories (name, color, world_id) values ('Étincelle', 'lime', 1);
insert into public.character_categories (name, color, world_id) values ('Buse blanche', 'yellow', 1);
insert into public.character_categories (name, color, world_id) values ('Ecclésiastique', 'violet', 1);
insert into public.character_categories (name, color, world_id) values ('Militaire', 'orange', 1);
insert into public.character_categories (name, color, world_id) values ('Activiste', 'sky', 1);
insert into public.character_categories (name, color, world_id) values ('Commerçant', 'amber', 1);

-- Worlds' calendars
insert into public.calendars (world_id, name, today, state) values (1, 'Calendrier solaire', '{ "day": 23, "month": 8, "year": 3209 }', 'published');

-- Calendar's months
insert into public.calendar_months (name, days, position, calendar_id) values ('Jalen', 32, 1, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Malsen', 32, 2, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Verlys', 32, 3, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Nalys', 32, 4, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Verdore', 32, 5, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Sidore', 32, 6, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Lyllion', 32, 7, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Rion', 32, 8, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Farene', 32, 9, 1);
insert into public.calendar_months (name, days, position, calendar_id) values ('Dalvene', 32, 10, 1);

-- Event categories
insert into public.calendar_event_categories (name, color, calendar_id) values ('Naissance', 'white', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Mort', 'black', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Catastrophe', 'orange', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Catastrophe naturelle', 'red', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Inauguration', 'green', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Religion', 'violet', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Invention', 'teal', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Science', 'indigo', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Bénédiction', 'white', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Joueurs', 'white', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Découverte', 'purple', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Exploration', 'lime', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Construction', 'blue', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Magie', 'cyan', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Criminalité', 'rose', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Scandale', 'pink', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Commerce', 'amber', 1);
insert into public.calendar_event_categories (name, color, calendar_id) values ('Législation', 'blue', 1);

-- Events
insert into public.calendar_events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Laurdieu devient la première cité de l''empire de Kaliatos',
  'L''empire de Kaliatos établi sa capitale dans la cité de Laurdieu, qui connaitra une prospérité nouvelle au sein d''Aldys.',
  '{ "day": 3, "month": 4, "year": -1932 }',
  18,
  true,
  'https://alexcreates.fr/leim/index.php/Laurdieu',
  1
);
insert into public.calendar_events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Apparition d''Asménys',
  'La défunte chanteuse Asménys apparaît à un barde pendant son jeune public, démarrant la religion des Prêtresses d''Asménys.',
  '{ "day": 19, "month": 7, "year": -1358 }',
  6,
  true,
  'https://alexcreates.fr/leim/index.php/Pr%C3%AAtresses_d%27Asm%C3%A9nys',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'La Rupture',
  'Les Abysses se déversent à la surface de Léim, à travers plusieurs brèches. Plusieurs hordes de démons se rapprochent des villes, et ce qu''on appellera l''Âge des Abysses commencent alors sur la planète entière.',
  '{ "day": 26, "month": 5, "year": -756 }',
  '{ "day": 4, "month": 9, "year": 29 }',
  3,
  true,
  'https://alexcreates.fr/leim/index.php/Seconde_Rupture',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Marche du sang',
  'L''empereur de Kaliatos ordonne personnellement la traque de Jorhas Kirendre pour connivence avec les démons. Plusieurs bataillons sont affectés à la chasse de Jorhas, qui se terminera par son incarcération ainsi que la mort de plusieurs centaines de soldats.',
  '{ "day": 18, "month": 9, "year": -420 }',
  '{ "day": 27, "month": 1, "year": -419 }',
  15,
  true,
  'https://alexcreates.fr/leim/index.php/Jorhas_Kirendre',
  1
);
insert into public.calendar_events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Exécution de Tyhos',
  'Le léviathan Tyhos rend l''âme après un combat de plusieurs années contre Lystos, le dieu du Soleil.',
  '{ "day": 1, "month": 0, "year": 0 }',
  9,
  true,
  'https://alexcreates.fr/leim/index.php/Tyhos',
  1
);
insert into public.calendar_events (title, start_date, category, wiki, calendar_id) values (
  'Traité de Kadel',
  '{ "day": 29, "month": 4, "year": 100 }',
  5,
  'https://alexcreates.fr/leim/index.php/Alliance_Kald%C3%A9lienne#Trait%C3%A9_de_Kadel',
  1
);
insert into public.calendar_events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Découverte des Plaines de Poussières',
  'Les troupes de la reconquête aldienne explorent le littoral d''une immense étendue grise et inerte.',
  '{ "day": 17, "month": 7, "year": 305 }',
  11,
  true,
  'https://alexcreates.fr/leim/index.php/Plaines_de_poussi%C3%A8re',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Construction du Rempart de Laurdieu',
  'Le Grand Conseil Kaldélien ordonne la construction d''une muraille autour des Plaines de Poussières, afin de contenir les démons y sortant.',
  '{ "day": 30, "month": 2, "year": 340 }',
  '{ "day": 27, "month": 9, "year": 355 }',
  13,
  true,
  'https://alexcreates.fr/leim/index.php/Plaines_de_poussi%C3%A8re',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Inauguration de l''Académie Artistique Arcanique',
  'Scäd Sceni ouvre son institut artistique dédié à l''apprentissage des arts arcaniques.',
  '{ "day": 11, "month": 6, "year": 2545 }',
  null,
  5,
  false,
  'https://alexcreates.fr/leim/index.php/Acad%C3%A9mie_Artistique_Arcanique',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Création de la buse kaldélienne',
  'Sophia de Rougefer invente la buse kaldélienne, une arme à feu souple à deux canons.',
  '{ "day": 4, "month": 2, "year": 3113 }',
  null,
  7,
  false,
  'https://alexcreates.fr/leim/index.php/Buse_(arme)',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Feux dans les champs de Bamast',
  'Plusieurs incendies criminels se propagent à travers les champs de sérille des fermiers des littoraux de Bamast. Aucun suspect ni coupable ne sera trouvé et l''enquête sera baclée.',
  '{ "day": 9, "month": 5, "year": 3200 }',
  null,
  15,
  false,
  'https://alexcreates.fr/leim/index.php/Vascylly',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Meurtre de Darléon Typhos',
  'Darléon Typhos surprend Vascylly fouillant sa demeure peu après la tombée de la nuit. Le majordome de la famille Typhos découvre le corps sans vie de son maître le lendemain.',
  '{ "day": 21, "month": 6, "year": 3200 }',
  null,
  15,
  false,
  'https://alexcreates.fr/leim/index.php/Vascylly',
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Scandale Rodhus',
  'Tivian Rodhus, un professeur estimé de l''Académie Centrale Kaldélienne, est emprisonné pour corruption et aggression sexuelle. Le corps enseignant y est remanié sur ordre de Lazarus Tymos, comte de Nacride.',
  '{ "day": 25, "month": 9, "year": 3208 }',
  null,
  15,
  false,
  'https://alexcreates.fr/leim/index.php/Tivian_Rodhus',
  1
);

insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Arrivée d''aventuriers à Borélis',
  'Tara Belyus, Vascylly et Adol Sulvan livrent 3 condamnés à Handany. Ils partent pour la mer durant la journée.',
  '{ "day": 12, "month": 7, "year": 3209 }',
  null,
  10,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Naufrage de l''Éclipse',
  'L''Éclipse, le navire de la garde contenant des condamnés à destination des Cages Handaniennes, s''échoue au large des côtes montagneuses de la Lance d''Aldys.',
  '{ "day": 14, "month": 7, "year": 3209 }',
  null,
  3,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Emprisonnement de Tivian Rodhus',
  'Celui qu''on surnomme la Bête d''Ambrose arrive à Handany, où il purgera sa peine.',
  '{ "day": 14, "month": 7, "year": 3209 }',
  null,
  15,
  false,
  'https://alexcreates.fr/leim/index.php/Tivian_Rodhus',
  1
);
insert into public.calendar_events (title, start_date, category, hidden, calendar_id) values (
  'Sulvan et Anastael atteignent Bamast',
  '{ "day": 19, "month": 2, "year": 3210 }',
  10,
  false,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Jugement de Bormis Griloup',
  'Bormis Griloup est jugé coupable d''escroquerie et sabotage aux Cours d''Acier de Tourgrise. Il purgera une peine de 10 ans au sein des prisons royales.',
  'Tourgrise',
  '{ "day": 4, "month": 8, "year": 3209 }',
  null,
  15,
  false,
  null,
  1
);

insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Inauguration de la Cloche du Pilier',
  'Le Moine Premier inaugure la grande cloche d''argent au sommet du Pilier d''Ikami.',
  'Cantane',
  '{ "day": 29, "month": 5, "year": 3209 }',
  null,
  6,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  '1ère disparition',
  'Taleb Vaht décède dans une grotte à la suite d''une attaque d''ischiels enragées.',
  'Cantane',
  '{ "day": 28, "month": 7, "year": 3209 }',
  null,
  2,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  '2ème disparition',
  'Donovane le mineur kéturien disparait sans laisser de traces.',
  'Cantane',
  '{ "day": 32, "month": 7, "year": 3209 }',
  null,
  2,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  '3ème disparition',
  'Disparition de Sébastien, gredin sauride.',
  'Cantane',
  '{ "day": 10, "month": 8, "year": 3209 }',
  null,
  2,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  '4ème disparition',
  'Disparition de Thérence, patrouilleur sauride de la Vieille Garde.',
  'Cantane',
  '{ "day": 19, "month": 8, "year": 3209 }',
  null,
  2,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  '5ème disparition',
  'Disparition de Mathilda Boulais, vendeuse de pierres.',
  'Cantane',
  '{ "day": 22, "month": 8, "year": 3209 }',
  null,
  2,
  false,
  null,
  1
);
insert into public.calendar_events (title, description, location, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Grande Bourse Minérale',
  'Les artisans et mineurs de Rougefer se réunissent pour vendre le fruit de leur dur labeur.',
  'Cantane',
  '{ "day": 23, "month": 8, "year": 3209 }',
  '{ "day": 26, "month": 8, "year": 3209 }',
  17,
  false,
  null,
  1
);
