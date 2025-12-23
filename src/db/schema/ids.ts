// Shared IDs for foreign key references across schema files

export const STUDIO_IDS = {
  gainax: "019b48ba-eac5-7000-85c0-3ef877607b73",
  khara: "019b48ba-eac5-7001-832b-cc5d8b463318",
  tatsunoko: "019b48ba-eac5-7002-8e4f-b99f9f2765be",
};

export const NGE_SHOW = "019b490e-2484-7000-a31d-63a21df12ff4";

export const MOVIE_IDS = {
  deathAndRebirth: "019b490e-2485-7000-a616-d1c5309aa567",
  endOfEva: "019b490e-2485-7001-99aa-8cc0e821e0fe",
  rebuild1: "019b490e-2485-7002-9d0f-270f6b95977d",
  rebuild2: "019b490e-2485-7003-a911-0ab94dd9e700",
  rebuild3: "019b490e-2485-7004-b921-736c7525ddc1",
  rebuild4: "019b490e-2485-7005-83de-8d38f0397f09",
};

export const ORG_IDS = {
  nerv: "019b4926-f52e-7000-864f-ce83257c95b2",
  seele: "019b4926-f52e-7001-88a5-b69b264dd661",
  wille: "019b4926-f52e-7002-9ca3-c07c10808b64",
  gehirn: "019b4926-f52e-7003-b6f3-415dc7665201",
  japanGov: "019b4926-f52e-7004-866d-c2f80d52d721",
  un: "019b4926-f52e-7005-bbf6-e94adc6eefa1",
};

export const CHAR_IDS = {
  shinji: "019b491a-6b36-7000-9dce-eac3a1978cd9",
  rei: "019b491a-6b36-7001-8877-7768134a9a61",
  asuka: "019b491a-6b36-7002-b500-53981aee69dd",
  misato: "019b491a-6b36-7003-acad-14b9d61a8c56",
  gendo: "019b491a-6b36-7004-aa4c-cd8165837828",
  kaworu: "019b491a-6b36-7005-8538-312b60ed8cb7",
  ritsuko: "019b491a-6b36-7006-bf17-0f2e7e5e6bae",
  fuyutsuki: "019b491a-6b36-7007-91d5-9841b4cea779",
  toji: "019b491a-6b36-7008-a432-a2b30175da16",
  kensuke: "019b491a-6b36-7009-a789-792bef2bbf55",
  hikari: "019b491a-6b36-700a-b44e-a41035614633",
  kaji: "019b491a-6b36-700b-8a56-65c22af2e85b",
  yui: "019b491a-6b36-700c-9161-4718f2c0ac14",
  kyoko: "019b496e-d1d6-7000-9bc5-22f6c2164637",
  penpen: "019b491a-6b36-700d-bc23-fc5b19bad780",
  mari: "019b491a-6b36-700e-bc42-1e7497fb9d27",
};

export const EP_IDS = {
  ep1: "019b492f-8465-7000-bb58-88b18b1c1c8c",
  ep2: "019b492f-8465-7001-8b63-c4863cd09e51",
  ep3: "019b492f-8465-7002-b189-d2594083307b",
  ep4: "019b492f-8465-7003-be1c-77509f5cab70",
  ep5: "019b492f-8465-7004-b35f-01df8b5e1325",
  ep6: "019b492f-8465-7005-ae30-55cbf2ad7b1a",
  ep7: "019b492f-8465-7006-b399-85748d7fc96d",
  ep8: "019b492f-8465-7007-96e9-33f1dee09cbf",
  ep9: "019b492f-8465-7008-8da6-98ea8a70c9f4",
  ep10: "019b492f-8465-7009-aa58-a6cd3df0b96e",
  ep11: "019b492f-8465-700a-8a59-5c749ff2d371",
  ep12: "019b492f-8465-700b-8f70-1a4df0d2bb18",
  ep13: "019b492f-8465-700c-9ed6-39480ce4a3d7",
  ep14: "019b492f-8465-700d-9c1f-579632c3a5f9",
  ep15: "019b492f-8465-700e-a92e-d28d63809bb8",
  ep16: "019b492f-8465-700f-a2f0-f3fa6e4f97e5",
  ep17: "019b492f-8465-7010-a795-afcaa41ed548",
  ep18: "019b492f-8465-7011-a180-5e1fa8e3577c",
  ep19: "019b492f-8465-7012-b5de-0a2f64ef42f6",
  ep20: "019b492f-8465-7013-9f88-14315c9d30df",
  ep21: "019b492f-8465-7014-bfa6-2a5f007005fd",
  ep22: "019b492f-8465-7015-9345-642da2140c42",
  ep23: "019b492f-8465-7016-8e22-13e7381c5b78",
  ep24: "019b492f-8465-7017-8b2a-2cd062a231d6",
  ep25: "019b492f-8465-7018-b565-6924fdf3e6d3",
  ep26: "019b492f-8465-7019-a0cc-4cdc5e84db1c",
};

export const ALL_EPISODES = Object.values(EP_IDS);

export const ANGEL_IDS = {
  adam: "019b4942-6ba6-7000-b4c3-bcde78d7ef7a",
  lilith: "019b4942-6ba6-7001-9dbf-5d4564002a02",
  sachiel: "019b4942-6ba6-7002-8642-12737a5ad140",
  shamshel: "019b4942-6ba6-7003-9ad7-451cb89f665f",
  ramiel: "019b4942-6ba6-7004-abbd-78b47f6f2813",
  gaghiel: "019b4942-6ba6-7005-a8e7-5e90f5e108c6",
  israfel: "019b4942-6ba6-7006-ad7f-477ac503e22f",
  sandalphon: "019b4942-6ba6-7007-b9cf-25153d6db589",
  matarael: "019b4942-6ba6-7008-8c54-a0d1a92f6a07",
  sahaquiel: "019b4942-6ba6-7009-ba95-8303557856bf",
  ireul: "019b4942-6ba6-700a-b673-dfc0bcb8c0c9",
  leliel: "019b4942-6ba6-700b-b2c2-a6a9867d1135",
  bardiel: "019b4942-6ba6-700c-93d8-db60b0cadfd2",
  zeruel: "019b4942-6ba6-700d-b4f9-4654f0078550",
  arael: "019b4942-6ba6-700e-a4ad-49e657db7e39",
  armisael: "019b4942-6ba6-700f-816d-9994ec3bd985",
  tabris: "019b4942-6ba6-7010-8d0a-b5ca4a58a4fc",
};

export const EVA_IDS = {
  unit00: "019b4966-ecc6-7000-968f-386c0db53e65",
  unit01: "019b4966-ecc6-7001-af53-7e7c9bcb93aa",
  unit02: "019b4966-ecc6-7002-ae41-f4f4371235bf",
  unit03: "019b4966-ecc6-7003-834c-ea1759e33483",
  unit04: "019b4966-ecc6-7004-b21a-b03e1932407c",
  massProduction: "019b4966-ecc6-7005-b2d6-c74d0cb3fb0d",
  unit08: "019b4966-ecc6-7006-877c-a1f73e7190b7",
  unit13: "019b4966-ecc6-7007-b7ff-346cd143f5fc",
  mark06: "019b4966-ecc6-7008-88f9-f9d49f7ed190",
};

export const STAFF_IDS = {
  anno: "019b4ba4-16c8-7000-aa9b-7379f799e904",
  sadamoto: "019b4ba4-16ca-7000-b03f-d97d012ed240",
  tsurumaki: "019b4ba4-16ca-7001-bad0-f5cdc574d625",
  sagisu: "019b4ba4-16ca-7002-ab9a-d229c562fcd2",
  takahashi: "019b4ba4-16ca-7003-a43b-debc1f1ce38e",
  honda: "019b4ba4-16ca-7004-9383-e3cc3f612d83",
  masayuki: "019b4ba4-16ca-7005-981f-164175a0c7b4",
  enokido: "019b4ba4-16ca-7006-8a1e-4f59fb4f68b6",
  satsukawa: "019b4ba4-16ca-7007-96d2-f832d4569e91",
  ogata: "019b4ba4-16ca-7008-8f05-e8d74edacc85",
  miyamura: "019b4ba4-16ca-7009-9b24-de1b90e53a0c",
  hayashibara: "019b4ba4-16ca-700a-bc2d-228087b81942",
  mitsuishi: "019b4ba4-16ca-700b-8ae3-f5194f33c5a4",
  ishida: "019b4ba4-16ca-700c-9a7c-8ec1d47610c2",
  tachiki: "019b4ba4-16ca-700d-9dbe-a39aeee76195",
};
