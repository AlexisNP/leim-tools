insert into public.role_permissions (role, permission) values ('sa', 'events.see.hidden');
insert into public.role_permissions (role, permission) values ('sa', 'users.ban');

-- Event categories
insert into public.calendar_event_categories (name) values ('naissance');
insert into public.calendar_event_categories (name) values ('mort');
insert into public.calendar_event_categories (name) values ('catastrophe');
insert into public.calendar_event_categories (name) values ('catastrophe naturelle');
insert into public.calendar_event_categories (name) values ('inauguration');
insert into public.calendar_event_categories (name) values ('religion');
insert into public.calendar_event_categories (name) values ('invention');
insert into public.calendar_event_categories (name) values ('science');
insert into public.calendar_event_categories (name) values ('bénédiction');
insert into public.calendar_event_categories (name) values ('joueurs');
insert into public.calendar_event_categories (name) values ('découverte');
insert into public.calendar_event_categories (name) values ('exploration');
insert into public.calendar_event_categories (name) values ('construction');
insert into public.calendar_event_categories (name) values ('arcanologie');
insert into public.calendar_event_categories (name) values ('criminalité');
insert into public.calendar_event_categories (name) values ('scandale');
insert into public.calendar_event_categories (name) values ('commerce');
insert into public.calendar_event_categories (name) values ('législation');

-- Character categories
insert into public.character_categories (name) values ('joueur');
insert into public.character_categories (name) values ('comte');
insert into public.character_categories (name) values ('scientifique');
insert into public.character_categories (name) values ('mage');
insert into public.character_categories (name) values ('professeur');
insert into public.character_categories (name) values ('criminel');
insert into public.character_categories (name) values ('étincelle');
insert into public.character_categories (name) values ('buse blanche');
insert into public.character_categories (name) values ('ecclésiastique');
insert into public.character_categories (name) values ('militaire');
insert into public.character_categories (name) values ('activiste');
insert into public.character_categories (name) values ('commerçant');

-- Worlds
insert into public.worlds (name, description, color) values ('Léïm', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet congue aliquet. Curabitur eu iaculis diam. Nunc iaculis nibh orci, eu semper nunc congue congue. Praesent euismod tortor eget metus tristique lobortis vel in risus. In volutpat ligula orci, id pharetra lectus egestas at.', 'black');

-- Worlds' calendars
insert into public.calendars (world_id, name) values (1, 'Calendrier solaire');

-- Calendar's months
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Jalen', 32, 1);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Malsen', 32, 2);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Verlys', 32, 3);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Nalys', 32, 4);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Verdore', 32, 5);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Sidore', 32, 6);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Lyllion', 32, 7);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Rion', 32, 8);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Farene', 32, 9);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Dalvene', 32, 10);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Testos', 32, 11);
insert into public.calendar_months (calendar_id, name, days, position) values (1, 'Jalen2 le meilleur', 32, 12);

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
