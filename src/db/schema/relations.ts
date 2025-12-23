import type Database from "bun:sqlite";
import {
  ALL_EPISODES,
  ANGEL_IDS,
  CHAR_IDS,
  EP_IDS,
  EVA_IDS,
  MOVIE_IDS,
  NGE_SHOW,
  ORG_IDS,
  STAFF_IDS,
  STUDIO_IDS,
} from "./ids";

export function initializeRelations(db: Database) {
  // Character-Show junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_shows (
      character_id TEXT NOT NULL,
      show_id TEXT NOT NULL,
      PRIMARY KEY (character_id, show_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (show_id) REFERENCES shows(id)
    )
  `);

  // Character-Movie junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_movies (
      character_id TEXT NOT NULL,
      movie_id TEXT NOT NULL,
      PRIMARY KEY (character_id, movie_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (movie_id) REFERENCES movies(id)
    )
  `);

  // Character-Organization junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_organizations (
      character_id TEXT NOT NULL,
      organization_id TEXT NOT NULL,
      PRIMARY KEY (character_id, organization_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (organization_id) REFERENCES organizations(id)
    )
  `);

  // Character-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_episodes (
      character_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (character_id, episode_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  // Organization-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS organization_episodes (
      organization_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (organization_id, episode_id),
      FOREIGN KEY (organization_id) REFERENCES organizations(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  // Angel-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS angel_episodes (
      angel_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (angel_id, episode_id),
      FOREIGN KEY (angel_id) REFERENCES angels(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  // Eva-Pilot junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS eva_pilots (
      eva_id TEXT NOT NULL,
      character_id TEXT NOT NULL,
      PRIMARY KEY (eva_id, character_id),
      FOREIGN KEY (eva_id) REFERENCES evas(id),
      FOREIGN KEY (character_id) REFERENCES characters(id)
    )
  `);

  // Eva-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS eva_episodes (
      eva_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (eva_id, episode_id),
      FOREIGN KEY (eva_id) REFERENCES evas(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  // Eva-Movie junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS eva_movies (
      eva_id TEXT NOT NULL,
      movie_id TEXT NOT NULL,
      PRIMARY KEY (eva_id, movie_id),
      FOREIGN KEY (eva_id) REFERENCES evas(id),
      FOREIGN KEY (movie_id) REFERENCES movies(id)
    )
  `);

  // Studio-Staff junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS studio_staff (
      studio_id TEXT NOT NULL,
      staff_id TEXT NOT NULL,
      PRIMARY KEY (studio_id, staff_id),
      FOREIGN KEY (studio_id) REFERENCES studios(id),
      FOREIGN KEY (staff_id) REFERENCES staff(id)
    )
  `);

  // Seed junction table data
  seedCharacterShows(db);
  seedCharacterMovies(db);
  seedCharacterOrganizations(db);
  seedCharacterEpisodes(db);
  seedOrganizationEpisodes(db);
  seedAngelEpisodes(db);
  seedEvaPilots(db);
  seedEvaEpisodes(db);
  seedEvaMovies(db);
  seedStudioStaff(db);
}

function seedCharacterShows(db: Database) {
  const insertCharacterShow = db.prepare(
    "INSERT INTO character_shows (character_id, show_id) VALUES (?, ?)"
  );

  const originalCharacters = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.kaji,
    CHAR_IDS.yui,
    CHAR_IDS.penpen,
  ];

  for (const charId of originalCharacters) {
    insertCharacterShow.run(charId, NGE_SHOW);
  }
}

function seedCharacterMovies(db: Database) {
  const insertCharacterMovie = db.prepare(
    "INSERT INTO character_movies (character_id, movie_id) VALUES (?, ?)"
  );

  const originalCharacters = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.kaji,
    CHAR_IDS.yui,
    CHAR_IDS.penpen,
  ];

  // Death and Rebirth & End of Evangelion
  for (const charId of originalCharacters) {
    insertCharacterMovie.run(charId, MOVIE_IDS.deathAndRebirth);
    insertCharacterMovie.run(charId, MOVIE_IDS.endOfEva);
  }

  // Rebuild 1.0
  const rebuild1Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.penpen,
  ];
  for (const charId of rebuild1Chars) {
    insertCharacterMovie.run(charId, MOVIE_IDS.rebuild1);
  }

  // Rebuild 2.0
  const rebuild2Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.kaji,
    CHAR_IDS.penpen,
    CHAR_IDS.mari,
  ];
  for (const charId of rebuild2Chars) {
    insertCharacterMovie.run(charId, MOVIE_IDS.rebuild2);
  }

  // Rebuild 3.0
  const rebuild3Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.mari,
  ];
  for (const charId of rebuild3Chars) {
    insertCharacterMovie.run(charId, MOVIE_IDS.rebuild3);
  }

  // Rebuild 3.0+1.0
  const rebuild4Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.yui,
    CHAR_IDS.mari,
  ];
  for (const charId of rebuild4Chars) {
    insertCharacterMovie.run(charId, MOVIE_IDS.rebuild4);
  }
}

function seedCharacterOrganizations(db: Database) {
  const insertCharacterOrg = db.prepare(
    "INSERT INTO character_organizations (character_id, organization_id) VALUES (?, ?)"
  );

  // NERV members
  const nervMembers = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kaji,
  ];
  for (const charId of nervMembers) {
    insertCharacterOrg.run(charId, ORG_IDS.nerv);
  }

  // SEELE members
  insertCharacterOrg.run(CHAR_IDS.gendo, ORG_IDS.seele);
  insertCharacterOrg.run(CHAR_IDS.kaworu, ORG_IDS.seele);
  insertCharacterOrg.run(CHAR_IDS.kaji, ORG_IDS.seele);

  // WILLE members (Rebuild)
  insertCharacterOrg.run(CHAR_IDS.misato, ORG_IDS.wille);
  insertCharacterOrg.run(CHAR_IDS.ritsuko, ORG_IDS.wille);
  insertCharacterOrg.run(CHAR_IDS.asuka, ORG_IDS.wille);
  insertCharacterOrg.run(CHAR_IDS.mari, ORG_IDS.wille);

  // Gehirn members
  insertCharacterOrg.run(CHAR_IDS.yui, ORG_IDS.gehirn);
  insertCharacterOrg.run(CHAR_IDS.gendo, ORG_IDS.gehirn);
  insertCharacterOrg.run(CHAR_IDS.fuyutsuki, ORG_IDS.gehirn);

  // Japanese Government
  insertCharacterOrg.run(CHAR_IDS.kaji, ORG_IDS.japanGov);
}

function seedCharacterEpisodes(db: Database) {
  const insertCharacterEpisode = db.prepare(
    "INSERT INTO character_episodes (character_id, episode_id) VALUES (?, ?)"
  );

  // Shinji appears in all episodes
  for (const epId of ALL_EPISODES) {
    insertCharacterEpisode.run(CHAR_IDS.shinji, epId);
  }

  // Rei episodes
  const reiEpisodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep5, EP_IDS.ep6,
    EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep14, EP_IDS.ep16,
    EP_IDS.ep19, EP_IDS.ep20, EP_IDS.ep21, EP_IDS.ep22, EP_IDS.ep23,
    EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of reiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.rei, epId);
  }

  // Asuka appears from episode 8 onwards
  const asukaEpisodes = ALL_EPISODES.slice(7);
  for (const epId of asukaEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.asuka, epId);
  }

  // Misato appears in all episodes
  for (const epId of ALL_EPISODES) {
    insertCharacterEpisode.run(CHAR_IDS.misato, epId);
  }

  // Gendo episodes
  const gendoEpisodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep5, EP_IDS.ep6,
    EP_IDS.ep7, EP_IDS.ep12, EP_IDS.ep13, EP_IDS.ep14, EP_IDS.ep15,
    EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep19, EP_IDS.ep20, EP_IDS.ep21,
    EP_IDS.ep23, EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of gendoEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.gendo, epId);
  }

  // Kaworu episodes
  const kaworuEpisodes = [EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26];
  for (const epId of kaworuEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.kaworu, epId);
  }

  // Ritsuko episodes
  const ritsukoEpisodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep5, EP_IDS.ep6, EP_IDS.ep7,
    EP_IDS.ep10, EP_IDS.ep11, EP_IDS.ep12, EP_IDS.ep13, EP_IDS.ep14,
    EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep19, EP_IDS.ep20, EP_IDS.ep21,
    EP_IDS.ep23, EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of ritsukoEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.ritsuko, epId);
  }

  // Fuyutsuki episodes
  const fuyutsukiEpisodes = [
    EP_IDS.ep1, EP_IDS.ep5, EP_IDS.ep6, EP_IDS.ep7, EP_IDS.ep12,
    EP_IDS.ep14, EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep19, EP_IDS.ep20,
    EP_IDS.ep21, EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of fuyutsukiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.fuyutsuki, epId);
  }

  // Toji episodes
  const tojiEpisodes = [
    EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep8, EP_IDS.ep9, EP_IDS.ep11,
    EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep26,
  ];
  for (const epId of tojiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.toji, epId);
  }

  // Kensuke episodes
  const kensukeEpisodes = [
    EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep8, EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep26,
  ];
  for (const epId of kensukeEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.kensuke, epId);
  }

  // Hikari episodes
  const hikariEpisodes = [
    EP_IDS.ep3, EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep17, EP_IDS.ep26,
  ];
  for (const epId of hikariEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.hikari, epId);
  }

  // Kaji episodes
  const kajiEpisodes = [
    EP_IDS.ep8, EP_IDS.ep10, EP_IDS.ep12, EP_IDS.ep15, EP_IDS.ep17,
    EP_IDS.ep18, EP_IDS.ep21,
  ];
  for (const epId of kajiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.kaji, epId);
  }

  // Yui episodes (flashbacks)
  const yuiEpisodes = [
    EP_IDS.ep16, EP_IDS.ep20, EP_IDS.ep21, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of yuiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.yui, epId);
  }

  // Pen Pen episodes
  const penpenEpisodes = [
    EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep8, EP_IDS.ep9,
    EP_IDS.ep10, EP_IDS.ep11, EP_IDS.ep15, EP_IDS.ep26,
  ];
  for (const epId of penpenEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.penpen, epId);
  }
}

function seedOrganizationEpisodes(db: Database) {
  const insertOrgEpisode = db.prepare(
    "INSERT INTO organization_episodes (organization_id, episode_id) VALUES (?, ?)"
  );

  // NERV appears in all episodes
  for (const epId of ALL_EPISODES) {
    insertOrgEpisode.run(ORG_IDS.nerv, epId);
  }

  // SEELE episodes
  const seeleEpisodes = [
    EP_IDS.ep7, EP_IDS.ep12, EP_IDS.ep14, EP_IDS.ep17, EP_IDS.ep21,
    EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of seeleEpisodes) {
    insertOrgEpisode.run(ORG_IDS.seele, epId);
  }

  // Gehirn episodes (flashbacks)
  insertOrgEpisode.run(ORG_IDS.gehirn, EP_IDS.ep21);

  // Japanese Government episodes
  const japanGovEpisodes = [EP_IDS.ep7, EP_IDS.ep12, EP_IDS.ep17];
  for (const epId of japanGovEpisodes) {
    insertOrgEpisode.run(ORG_IDS.japanGov, epId);
  }

  // UN episodes
  const unEpisodes = [EP_IDS.ep7, EP_IDS.ep12];
  for (const epId of unEpisodes) {
    insertOrgEpisode.run(ORG_IDS.un, epId);
  }
}

function seedAngelEpisodes(db: Database) {
  const insertAngelEpisode = db.prepare(
    "INSERT INTO angel_episodes (angel_id, episode_id) VALUES (?, ?)"
  );

  // Adam
  insertAngelEpisode.run(ANGEL_IDS.adam, EP_IDS.ep15);
  insertAngelEpisode.run(ANGEL_IDS.adam, EP_IDS.ep21);

  // Lilith
  insertAngelEpisode.run(ANGEL_IDS.lilith, EP_IDS.ep15);
  insertAngelEpisode.run(ANGEL_IDS.lilith, EP_IDS.ep24);

  // Sachiel
  insertAngelEpisode.run(ANGEL_IDS.sachiel, EP_IDS.ep1);
  insertAngelEpisode.run(ANGEL_IDS.sachiel, EP_IDS.ep2);

  // Shamshel
  insertAngelEpisode.run(ANGEL_IDS.shamshel, EP_IDS.ep3);

  // Ramiel
  insertAngelEpisode.run(ANGEL_IDS.ramiel, EP_IDS.ep5);
  insertAngelEpisode.run(ANGEL_IDS.ramiel, EP_IDS.ep6);

  // Gaghiel
  insertAngelEpisode.run(ANGEL_IDS.gaghiel, EP_IDS.ep8);

  // Israfel
  insertAngelEpisode.run(ANGEL_IDS.israfel, EP_IDS.ep9);

  // Sandalphon
  insertAngelEpisode.run(ANGEL_IDS.sandalphon, EP_IDS.ep10);

  // Matarael
  insertAngelEpisode.run(ANGEL_IDS.matarael, EP_IDS.ep11);

  // Sahaquiel
  insertAngelEpisode.run(ANGEL_IDS.sahaquiel, EP_IDS.ep12);

  // Ireul
  insertAngelEpisode.run(ANGEL_IDS.ireul, EP_IDS.ep13);

  // Leliel
  insertAngelEpisode.run(ANGEL_IDS.leliel, EP_IDS.ep16);

  // Bardiel
  insertAngelEpisode.run(ANGEL_IDS.bardiel, EP_IDS.ep17);
  insertAngelEpisode.run(ANGEL_IDS.bardiel, EP_IDS.ep18);

  // Zeruel
  insertAngelEpisode.run(ANGEL_IDS.zeruel, EP_IDS.ep19);

  // Arael
  insertAngelEpisode.run(ANGEL_IDS.arael, EP_IDS.ep22);

  // Armisael
  insertAngelEpisode.run(ANGEL_IDS.armisael, EP_IDS.ep23);

  // Tabris
  insertAngelEpisode.run(ANGEL_IDS.tabris, EP_IDS.ep24);
}

function seedEvaPilots(db: Database) {
  const insertEvaPilot = db.prepare(
    "INSERT INTO eva_pilots (eva_id, character_id) VALUES (?, ?)"
  );

  // Unit-00
  insertEvaPilot.run(EVA_IDS.unit00, CHAR_IDS.rei);

  // Unit-01
  insertEvaPilot.run(EVA_IDS.unit01, CHAR_IDS.shinji);

  // Unit-02
  insertEvaPilot.run(EVA_IDS.unit02, CHAR_IDS.asuka);
  insertEvaPilot.run(EVA_IDS.unit02, CHAR_IDS.kaworu);

  // Unit-03
  insertEvaPilot.run(EVA_IDS.unit03, CHAR_IDS.toji);

  // Unit-08 (Rebuild)
  insertEvaPilot.run(EVA_IDS.unit08, CHAR_IDS.mari);

  // Unit-13 (Rebuild)
  insertEvaPilot.run(EVA_IDS.unit13, CHAR_IDS.shinji);
  insertEvaPilot.run(EVA_IDS.unit13, CHAR_IDS.kaworu);

  // Mark.06 (Rebuild)
  insertEvaPilot.run(EVA_IDS.mark06, CHAR_IDS.kaworu);
}

function seedEvaEpisodes(db: Database) {
  const insertEvaEpisode = db.prepare(
    "INSERT INTO eva_episodes (eva_id, episode_id) VALUES (?, ?)"
  );

  // Unit-00 episodes
  const unit00Episodes = [
    EP_IDS.ep5, EP_IDS.ep6, EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep12,
    EP_IDS.ep16, EP_IDS.ep19, EP_IDS.ep22, EP_IDS.ep23,
  ];
  for (const epId of unit00Episodes) {
    insertEvaEpisode.run(EVA_IDS.unit00, epId);
  }

  // Unit-01 episodes
  const unit01Episodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep5, EP_IDS.ep6,
    EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep12, EP_IDS.ep16, EP_IDS.ep18, EP_IDS.ep19,
    EP_IDS.ep20, EP_IDS.ep24,
  ];
  for (const epId of unit01Episodes) {
    insertEvaEpisode.run(EVA_IDS.unit01, epId);
  }

  // Unit-02 episodes
  const unit02Episodes = [
    EP_IDS.ep8, EP_IDS.ep9, EP_IDS.ep10, EP_IDS.ep11, EP_IDS.ep12,
    EP_IDS.ep16, EP_IDS.ep19, EP_IDS.ep22,
  ];
  for (const epId of unit02Episodes) {
    insertEvaEpisode.run(EVA_IDS.unit02, epId);
  }

  // Unit-03 episodes
  insertEvaEpisode.run(EVA_IDS.unit03, EP_IDS.ep17);
  insertEvaEpisode.run(EVA_IDS.unit03, EP_IDS.ep18);

  // Unit-04 mentioned in episode 17
  insertEvaEpisode.run(EVA_IDS.unit04, EP_IDS.ep17);
}

function seedEvaMovies(db: Database) {
  const insertEvaMovie = db.prepare(
    "INSERT INTO eva_movies (eva_id, movie_id) VALUES (?, ?)"
  );

  // Death and Rebirth / End of Evangelion
  const classicMovies = [MOVIE_IDS.deathAndRebirth, MOVIE_IDS.endOfEva];
  for (const movieId of classicMovies) {
    insertEvaMovie.run(EVA_IDS.unit00, movieId);
    insertEvaMovie.run(EVA_IDS.unit01, movieId);
    insertEvaMovie.run(EVA_IDS.unit02, movieId);
  }
  insertEvaMovie.run(EVA_IDS.massProduction, MOVIE_IDS.endOfEva);

  // Rebuild 1.0
  insertEvaMovie.run(EVA_IDS.unit00, MOVIE_IDS.rebuild1);
  insertEvaMovie.run(EVA_IDS.unit01, MOVIE_IDS.rebuild1);

  // Rebuild 2.0
  insertEvaMovie.run(EVA_IDS.unit00, MOVIE_IDS.rebuild2);
  insertEvaMovie.run(EVA_IDS.unit01, MOVIE_IDS.rebuild2);
  insertEvaMovie.run(EVA_IDS.unit02, MOVIE_IDS.rebuild2);
  insertEvaMovie.run(EVA_IDS.unit03, MOVIE_IDS.rebuild2);
  insertEvaMovie.run(EVA_IDS.mark06, MOVIE_IDS.rebuild2);

  // Rebuild 3.0
  insertEvaMovie.run(EVA_IDS.unit01, MOVIE_IDS.rebuild3);
  insertEvaMovie.run(EVA_IDS.unit02, MOVIE_IDS.rebuild3);
  insertEvaMovie.run(EVA_IDS.unit08, MOVIE_IDS.rebuild3);
  insertEvaMovie.run(EVA_IDS.unit13, MOVIE_IDS.rebuild3);
  insertEvaMovie.run(EVA_IDS.mark06, MOVIE_IDS.rebuild3);

  // Rebuild 3.0+1.0
  insertEvaMovie.run(EVA_IDS.unit01, MOVIE_IDS.rebuild4);
  insertEvaMovie.run(EVA_IDS.unit02, MOVIE_IDS.rebuild4);
  insertEvaMovie.run(EVA_IDS.unit08, MOVIE_IDS.rebuild4);
  insertEvaMovie.run(EVA_IDS.unit13, MOVIE_IDS.rebuild4);
}

function seedStudioStaff(db: Database) {
  const insertStudioStaff = db.prepare(
    "INSERT INTO studio_staff (studio_id, staff_id) VALUES (?, ?)"
  );

  // Gainax staff (original series)
  const gainaxStaff = [
    STAFF_IDS.anno,
    STAFF_IDS.sadamoto,
    STAFF_IDS.tsurumaki,
    STAFF_IDS.sagisu,
    STAFF_IDS.takahashi,
    STAFF_IDS.honda,
    STAFF_IDS.enokido,
    STAFF_IDS.satsukawa,
    STAFF_IDS.ogata,
    STAFF_IDS.miyamura,
    STAFF_IDS.hayashibara,
    STAFF_IDS.mitsuishi,
    STAFF_IDS.ishida,
    STAFF_IDS.tachiki,
  ];
  for (const staffId of gainaxStaff) {
    insertStudioStaff.run(STUDIO_IDS.gainax, staffId);
  }

  // Khara staff (Rebuild films)
  const kharaStaff = [
    STAFF_IDS.anno,
    STAFF_IDS.sadamoto,
    STAFF_IDS.tsurumaki,
    STAFF_IDS.sagisu,
    STAFF_IDS.honda,
    STAFF_IDS.masayuki,
    STAFF_IDS.ogata,
    STAFF_IDS.miyamura,
    STAFF_IDS.hayashibara,
    STAFF_IDS.mitsuishi,
    STAFF_IDS.ishida,
    STAFF_IDS.tachiki,
  ];
  for (const staffId of kharaStaff) {
    insertStudioStaff.run(STUDIO_IDS.khara, staffId);
  }

  // Tatsunoko Production
  insertStudioStaff.run(STUDIO_IDS.tatsunoko, STAFF_IDS.honda);
}
