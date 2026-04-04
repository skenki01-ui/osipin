const DAY_MS = 24 * 60 * 60 * 1000;

function getDefaultUser() {
  return {
    point: 120,
    pins: [], // [{ characterId, type, expireAt }]
    characterTurns: {}, // { rei: 3, teo: 1 }
    cards: {}, // 後で使う
  };
}

export function getUserData() {
  const raw = localStorage.getItem("user");
  if (!raw) {
    const user = getDefaultUser();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultUser(),
      ...parsed,
      pins: Array.isArray(parsed.pins) ? parsed.pins : [],
      characterTurns: parsed.characterTurns || {},
      cards: parsed.cards || {},
    };
  } catch {
    const user = getDefaultUser();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
}

export function saveUserData(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function cleanupExpiredPins(user) {
  const now = Date.now();

  return {
    ...user,
    pins: (user.pins || []).filter((pin) => pin.expireAt > now),
  };
}

export function getActivePins(user) {
  const cleaned = cleanupExpiredPins(user);
  return cleaned.pins;
}

export function getPinsByCharacter(user, characterId) {
  const cleaned = cleanupExpiredPins(user);
  return cleaned.pins.filter((pin) => pin.characterId === characterId);
}

export function getPinCount(user) {
  const cleaned = cleanupExpiredPins(user);
  return cleaned.pins.length;
}

export function canBuyPins(user, count) {
  const cleaned = cleanupExpiredPins(user);
  return cleaned.pins.length + count <= 3;
}

export function buyOnePin(characterId) {
  let user = getUserData();
  user = cleanupExpiredPins(user);

  if (user.point < 30) {
    return { ok: false, message: "ポイント不足です" };
  }

  if (!canBuyPins(user, 1)) {
    return { ok: false, message: "ピンは最大3つまでです" };
  }

  user.point -= 30;

  user.pins.push({
    characterId,
    type: "one",
    expireAt: Date.now() + DAY_MS,
  });

  user.characterTurns[characterId] = (user.characterTurns[characterId] || 0) + 3;

  saveUserData(user);

  return { ok: true, user };
}

export function buyThreePins(characterIds) {
  let user = getUserData();
  user = cleanupExpiredPins(user);

  if (user.point < 80) {
    return { ok: false, message: "ポイント不足です" };
  }

  if (!Array.isArray(characterIds) || characterIds.length !== 3) {
    return { ok: false, message: "3ピン分のキャラ指定が必要です" };
  }

  if (!canBuyPins(user, 3)) {
    return { ok: false, message: "ピンは最大3つまでです" };
  }

  user.point -= 80;

  characterIds.forEach((characterId) => {
    user.pins.push({
      characterId,
      type: "three",
      expireAt: Date.now() + DAY_MS,
    });

    user.characterTurns[characterId] = (user.characterTurns[characterId] || 0) + 3;
  });

  saveUserData(user);

  return { ok: true, user };
}

export function buyOneDay(characterId) {
  let user = getUserData();
  user = cleanupExpiredPins(user);

  if (user.point < 120) {
    return { ok: false, message: "ポイント不足です" };
  }

  if (!canBuyPins(user, 1)) {
    return { ok: false, message: "ピンは最大3つまでです" };
  }

  user.point -= 120;

  user.pins.push({
    characterId,
    type: "oneday",
    expireAt: Date.now() + DAY_MS,
  });

  saveUserData(user);

  return { ok: true, user };
}

export function hasOneDayPin(user, characterId) {
  const pins = getPinsByCharacter(user, characterId);
  return pins.some((pin) => pin.type === "oneday");
}

export function getCharacterTurns(user, characterId) {
  return user.characterTurns?.[characterId] || 0;
}

export function consumeTurn(characterId) {
  let user = getUserData();
  user = cleanupExpiredPins(user);

  if (hasOneDayPin(user, characterId)) {
    saveUserData(user);
    return {
      ok: true,
      user,
      turns: "∞",
    };
  }

  const currentTurns = user.characterTurns[characterId] || 0;

  if (currentTurns <= 0) {
    return { ok: false, message: "ターンがありません" };
  }

  user.characterTurns[characterId] = currentTurns - 1;

  saveUserData(user);

  return {
    ok: true,
    user,
    turns: user.characterTurns[characterId],
  };
}

export function addOneTurn(characterId) {
  let user = getUserData();
  user = cleanupExpiredPins(user);

  if (user.point < 5) {
    return { ok: false, message: "ポイント不足です" };
  }

  user.point -= 5;
  user.characterTurns[characterId] = (user.characterTurns[characterId] || 0) + 1;

  saveUserData(user);

  return { ok: true, user };
}

export function getRemainingTime(expireAt) {
  const diff = expireAt - Date.now();

  if (diff <= 0) {
    return "期限切れ";
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}時間${minutes}分`;
}