insert into public.role_permissions (role, permission) values ('sa', 'events.see.hidden');
insert into public.role_permissions (role, permission) values ('sa', 'users.ban');

-- Event categories
insert into public.events_category (name) values ('naissance');
insert into public.events_category (name) values ('mort');
insert into public.events_category (name) values ('catastrophe');
insert into public.events_category (name) values ('catastrophe naturelle');
insert into public.events_category (name) values ('inauguration');
insert into public.events_category (name) values ('religion');
insert into public.events_category (name) values ('invention');
insert into public.events_category (name) values ('science');
insert into public.events_category (name) values ('bénédiction');
insert into public.events_category (name) values ('joueurs');
insert into public.events_category (name) values ('découverte');
insert into public.events_category (name) values ('exploration');
insert into public.events_category (name) values ('construction');
insert into public.events_category (name) values ('arcanologie');
insert into public.events_category (name) values ('criminalité');
insert into public.events_category (name) values ('scandale');
insert into public.events_category (name) values ('commerce');
insert into public.events_category (name) values ('législation');

-- Character categories
insert into public.characters_category (name) values ('joueur');
insert into public.characters_category (name) values ('comte');
insert into public.characters_category (name) values ('scientifique');
insert into public.characters_category (name) values ('mage');
insert into public.characters_category (name) values ('professeur');
insert into public.characters_category (name) values ('criminel');
insert into public.characters_category (name) values ('étincelle');
insert into public.characters_category (name) values ('buse blanche');
insert into public.characters_category (name) values ('ecclésiastique');
insert into public.characters_category (name) values ('militaire');
insert into public.characters_category (name) values ('activiste');
insert into public.characters_category (name) values ('commerçant');

-- Worlds
insert into public.worlds (name, description, color) values ('Léïm', 'Monde d''aventures et d''intrigues med-fan', 'black');

-- Worlds' calendars
insert into public.world_calendars (world_id, months, days_per_year) values (1, ARRAY['Jalen', 'Malsen', 'Verlys', 'Nalys', 'Verdore', 'Sidore', 'Lyllion', 'Rion', 'Farene', 'Dalvene'], 320);

-- Events
insert into public.events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Laurdieu devient la première cité de l''empire de Kaliatos',
  'L''empire de Kaliatos établi sa capitale dans la cité de Laurdieu, qui connaitra une prospérité nouvelle au sein d''Aldys.',
  '{ "day": 3, "month": 4, "year": -1932 }',
  18,
  true,
  'https://alexcreates.fr/leim/index.php/Laurdieu',
  1
);
insert into public.events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Apparition d''Asménys',
  'La défunte chanteuse Asménys apparaît à un barde pendant son jeune public, démarrant la religion des Prêtresses d''Asménys.',
  '{ "day": 19, "month": 7, "year": -1358 }',
  6,
  true,
  'https://alexcreates.fr/leim/index.php/Pr%C3%AAtresses_d%27Asm%C3%A9nys',
  1
);
insert into public.events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'La Rupture',
  'Les Abysses se déversent à la surface de Léim, à travers plusieurs brèches. Plusieurs hordes de démons se rapprochent des villes, et ce qu''on appellera l''Âge des Abysses commencent alors sur la planète entière.',
  '{ "day": 26, "month": 5, "year": -756 }',
  '{ "day": 4, "month": 9, "year": 29 }',
  3,
  true,
  'https://alexcreates.fr/leim/index.php/Seconde_Rupture',
  1
);
insert into public.events (title, description, start_date, end_date, category, hidden, wiki, calendar_id) values (
  'Marche du sang',
  'L''empereur de Kaliatos ordonne personnellement la traque de Jorhas Kirendre pour connivence avec les démons. Plusieurs bataillons sont affectés à la chasse de Jorhas, qui se terminera par son incarcération ainsi que la mort de plusieurs centaines de soldats.',
  '{ "day": 18, "month": 9, "year": -420 }',
  '{ "day": 27, "month": 1, "year": -419 }',
  15,
  true,
  'https://alexcreates.fr/leim/index.php/Jorhas_Kirendre',
  1
);
insert into public.events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Exécution de Tyhos',
  'Le léviathan Tyhos rend l''âme après un combat de plusieurs années contre Lystos, le dieu du Soleil.',
  '{ "day": 1, "month": 0, "year": 0 }',
  9,
  true,
  'https://alexcreates.fr/leim/index.php/Tyhos',
  1
);
insert into public.events (title, start_date, category, wiki, calendar_id) values (
  'Traité de Kadel',
  '{ "day": 29, "month": 4, "year": 100 }',
  5,
  'https://alexcreates.fr/leim/index.php/Alliance_Kald%C3%A9lienne#Trait%C3%A9_de_Kadel',
  1
);
insert into public.events (title, description, start_date, category, hidden, wiki, calendar_id) values (
  'Découverte des Plaines de Poussières',
  'Les troupes de la reconquête aldienne explorent le littoral d''une immense étendue grise et inerte.',
  '{ "day": 17, "month": 7, "year": 305 }',
  11,
  true,
  'https://alexcreates.fr/leim/index.php/Plaines_de_poussi%C3%A8re',
  1
);
