export type MoodValue = "light" | "normal" | "heavy";
export type BodyValue = "fine" | "tired" | "hard";
export type ConcernValue = "work" | "relationship" | "vague";

export type HikiyoseResult = {
  id: string;
  mood: MoodValue;
  body: BodyValue;
  concern: ConcernValue;
  variant: 1 | 2;
  fortune: "大吉" | "中吉" | "小吉";
  title: string;
  shortText: string;
  action: string;
  deepPreview: string;
  deepFull: string;
};

type FortuneTemplate = {
  fortune: "大吉" | "中吉" | "小吉";
  titleA: string;
  titleB: string;
  shortA: string;
  shortB: string;
};

const baseMap: Record<`${MoodValue}-${BodyValue}`, FortuneTemplate> = {
  "light-fine": {
    fortune: "大吉",
    titleA: "流れに乗る日",
    titleB: "軽く動く日",
    shortA: "今日は力みすぎなくても流れが味方しやすい日。",
    shortB: "深く考えすぎるより、軽く始めた方が流れが開く日。",
  },
  "light-tired": {
    fortune: "中吉",
    titleA: "整えながら進む日",
    titleB: "少し整う日",
    shortA: "気分は前向き。体をいたわりながら動くとちょうどいい日。",
    shortB: "勢いはあるけれど、少し丁寧に整えると流れが良くなる日。",
  },
  "light-hard": {
    fortune: "中吉",
    titleA: "無理しない前進日",
    titleB: "やさしく動く日",
    shortA: "気持ちは前を向いているから、体にやさしく進めるといい日。",
    shortB: "踏ん張りすぎるより、軽く一歩だけ進めるとちょうどいい日。",
  },
  "normal-fine": {
    fortune: "中吉",
    titleA: "ひとつ選ぶ日",
    titleB: "流れを寄せる日",
    shortA: "派手さはないけれど、ひとつ決めると流れがまとまる日。",
    shortB: "今日は決めきることが運を寄せる日。小さくでも十分。",
  },
  "normal-tired": {
    fortune: "中吉",
    titleA: "少し整える日",
    titleB: "静かに戻す日",
    shortA: "今日は大きく変えるより、少し整えると楽になる日。",
    shortB: "気持ちも体も中間。戻したいところを一つ整える日。",
  },
  "normal-hard": {
    fortune: "小吉",
    titleA: "休みを混ぜる日",
    titleB: "やさしくほどく日",
    shortA: "勢いより回復が先。今日は少し緩めると流れが変わる日。",
    shortB: "止まるほどではないけれど、無理を減らすと楽になる日。",
  },
  "heavy-fine": {
    fortune: "中吉",
    titleA: "心を軽くする日",
    titleB: "考えすぎをほどく日",
    shortA: "体は動ける日。心の重さを少し外すと流れが戻る日。",
    shortB: "頭の中が詰まりやすい日。ひとつに絞ると楽になる。",
  },
  "heavy-tired": {
    fortune: "小吉",
    titleA: "無理しない日",
    titleB: "守りを選ぶ日",
    shortA: "今日はがんばりすぎ注意。守ることで流れが整う日。",
    shortB: "重さがある日。減らすことを選んだ方が良い流れになる日。",
  },
  "heavy-hard": {
    fortune: "小吉",
    titleA: "休んでいい日",
    titleB: "立て直しの日",
    shortA: "今は無理に進まなくていい日。回復がそのまま前進になる。",
    shortB: "今日は立て直し優先。少し休むことが一番の近道になる日。",
  },
};

const concernLines: Record<
  ConcernValue,
  {
    actionA: string;
    actionB: string;
    previewA: string;
    previewB: string;
    fullA: string;
    fullB: string;
  }
> = {
  work: {
    actionA: "5分だけ手をつけてみる",
    actionB: "やることを1つだけ減らしてみる",
    previewA: "仕事のことで気持ちが動きやすい日。全部を片づけようとしない方が流れは整いやすいよ。",
    previewB: "今は“量”より“順番”が大事。先にひとつ決めるだけで気持ちが少し軽くなる日。",
    fullA:
      "仕事に意識が向きやすい日は、真面目さが強く出やすいぶん、自分を追い込みやすい日でもあるよ。今日は全部を完璧にしようとするより、最初のひとつにだけ手をつけると流れが変わりやすい。少しでも進んだ感覚が出ると、そのあとが軽くなる日だよ。",
    fullB:
      "今日は“どれからやるか”がいちばん大事な日。量をこなそうとするより、優先をひとつ決めてしまう方が気持ちも流れも整いやすいよ。やることをひとつ減らすか、ひとつ終わらせるか、そのどちらかで十分。完璧じゃなくても流れは変わる日だよ。",
  },
  relationship: {
    actionA: "一言だけでも気持ちをやさしく伝えてみる",
    actionB: "今は返さなくていい言葉をひとつ見送る",
    previewA: "人との流れが動きやすい日。ちゃんと話すより、少しやさしい空気を作るのが先でいいよ。",
    previewB: "関係が気になる日は、無理に答えを出さない方が良い日。今は反応を減らすのも整え方のひとつだよ。",
    fullA:
      "人間関係が気になる日は、正しさより空気のやわらかさが大事になるよ。今日は何かを解決しようとするより、少しやさしく返す、少しやわらかく受け取る、それくらいで十分。大きく動かなくても、空気が少し変わるだけで流れはちゃんと変わる日だよ。",
    fullB:
      "関係が気になる時ほど、すぐ返事を出したくなるけれど、今日は“今すぐ返さない”ことも流れを守る選択だよ。自分を守るための距離感は悪いものじゃない。少し落ち着いてから言葉を選ぶと、余計なこじれを減らせる日だよ。",
  },
  vague: {
    actionA: "深呼吸して身の回りを1つ整える",
    actionB: "今日は答えを急がず、ひとつだけ気分を変える",
    previewA: "なんとなく重い時は、原因を探すより空気を変える方が先に効く日だよ。",
    previewB: "はっきりしない時ほど、小さい変化が流れを作る日。大きい答えはいらないよ。",
    fullA:
      "理由がはっきりしない重さがある日は、考えて整理しようとしすぎるほど余計に固まりやすいよ。今日は原因よりも“空気を変えること”に意味がある日。深呼吸でも、机の上でも、飲み物でもいいから、ひとつだけ変えると流れがやわらかくなるよ。",
    fullB:
      "なんとなく落ち着かない日は、答えを出すより“自分を動かしすぎない”ことが大事だよ。大きく変えなくていい。少し席を立つ、少し窓を見る、少し水を飲む。それくらいの小ささで十分流れは変わる日だよ。",
  },
};

function buildResults(): HikiyoseResult[] {
  const moods: MoodValue[] = ["light", "normal", "heavy"];
  const bodies: BodyValue[] = ["fine", "tired", "hard"];
  const concerns: ConcernValue[] = ["work", "relationship", "vague"];
  const results: HikiyoseResult[] = [];

  for (const mood of moods) {
    for (const body of bodies) {
      for (const concern of concerns) {
        const base = baseMap[`${mood}-${body}`];
        const concernData = concernLines[concern];

        results.push({
          id: `${mood}-${body}-${concern}-1`,
          mood,
          body,
          concern,
          variant: 1,
          fortune: base.fortune,
          title: base.titleA,
          shortText: base.shortA,
          action: concernData.actionA,
          deepPreview: concernData.previewA,
          deepFull: concernData.fullA,
        });

        results.push({
          id: `${mood}-${body}-${concern}-2`,
          mood,
          body,
          concern,
          variant: 2,
          fortune: base.fortune,
          title: base.titleB,
          shortText: base.shortB,
          action: concernData.actionB,
          deepPreview: concernData.previewB,
          deepFull: concernData.fullB,
        });
      }
    }
  }

  return results;
}

export const hikiyoseResults: HikiyoseResult[] = buildResults();

function getDaySeed(): 1 | 2 {
  const now = new Date();
  const seed = now.getFullYear() + (now.getMonth() + 1) + now.getDate();
  return seed % 2 === 0 ? 1 : 2;
}

export function pickResult(
  mood: MoodValue,
  body: BodyValue,
  concern: ConcernValue
): HikiyoseResult {
  const variant = getDaySeed();
  const found =
    hikiyoseResults.find(
      (item) =>
        item.mood === mood &&
        item.body === body &&
        item.concern === concern &&
        item.variant === variant
    ) ||
    hikiyoseResults.find(
      (item) =>
        item.mood === mood &&
        item.body === body &&
        item.concern === concern
    );

  if (!found) {
    return hikiyoseResults[0];
  }

  return found;
}

export function getResultById(id: string): HikiyoseResult | null {
  return hikiyoseResults.find((item) => item.id === id) ?? null;
}