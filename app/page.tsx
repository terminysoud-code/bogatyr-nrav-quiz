"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Hero = {
  id: string; name: string; epithet: string; monogram: string; color: string;
  portrait: string; motto: string; description: string; strengths: string[];
  shadow: string; story: string; axes: [number, number, number, number, number];
};

const heroes: Hero[] = [
  { id:"ilya", name:"Илья Муромец", epithet:"Несокрушимый защитник", monogram:"ИМ", color:"#b8432f", portrait:"Мудрая сила", motto:"Сила — в том, за кого ты стоишь.", description:"Вы спокойны, выносливы и не ищете славы ради славы. Долго наблюдаете, но, если справедливость нарушена, действуете прямо и до конца.", strengths:["стойкость","верность","здравый смысл"], shadow:"Можете слишком долго терпеть и брать на себя чужую ответственность.", story:"Крестьянский сын, исцелившийся после долгой неподвижности и ставший главным защитником Руси. В былинах спорит с князем, но остаётся верен земле и людям.", axes:[-1,1,0,1,1] },
  { id:"dobrynya", name:"Добрыня Никитич", epithet:"Учтивый дипломат", monogram:"ДН", color:"#446b7a", portrait:"Тактичный мастер", motto:"Сначала пойми правила игры — затем измени её.", description:"Вы сочетаете образованность, выдержку и отвагу. Умеете говорить с сильными мира, улаживать споры и переходить к решительным действиям, когда переговоры исчерпаны.", strengths:["дипломатичность","обучаемость","самообладание"], shadow:"Иногда слишком долго сохраняете лицо и скрываете собственные желания.", story:"Былинный змееборец, гусляр, пловец и посол. В отличие от прямолинейных героев, побеждает не только силой, но воспитанием и искусством переговоров.", axes:[1,1,1,0,0] },
  { id:"alyosha", name:"Алёша Попович", epithet:"Остроумный импровизатор", monogram:"АП", color:"#c47a24", portrait:"Ловкий ум", motto:"Если нельзя одолеть силой — переиграй.", description:"Вы быстры на язык и на решение. Видите лазейки, не робеете перед авторитетом и превращаете неопределённость в пространство для манёвра.", strengths:["находчивость","смелость","юмор"], shadow:"Азарт и самоуверенность могут сделать вашу шутку слишком острой, а обещание — поспешным.", story:"Младший из знаменитой троицы, сын ростовского священника. В схватках с Тугарином побеждает наблюдательностью, уловкой и дерзким словом.", axes:[1,-1,-1,-1,-1] },
  { id:"mikula", name:"Микула Селянинович", epithet:"Созидатель земли", monogram:"МС", color:"#55724a", portrait:"Тихая опора", motto:"Настоящая сила оставляет после себя хлеб, а не пепел.", description:"Вы практичны, основательны и внутренне независимы. Цените полезный труд выше статуса и впечатляете не громкостью, а тем, что на вас действительно можно опереться.", strengths:["надёжность","мастерство","скромность"], shadow:"Можете недооценивать собственное влияние и с недоверием относиться к слишком смелым переменам.", story:"Богатырь-пахарь, чья связь с землёй сильнее княжеской дружины. Его сошку не может поднять целый отряд, а суму с «тягой земной» — сам Святогор.", axes:[-1,1,1,1,1] },
  { id:"volga", name:"Вольга Святославич", epithet:"Стратег-превращенец", monogram:"ВС", color:"#644e83", portrait:"Зоркий стратег", motto:"Мир меняется — меняйся быстрее него.", description:"Вас ведут любопытство и масштаб замысла. Вы собираете людей, осваиваете новые роли и предпочитаете понимать систему целиком, прежде чем сделать ход.", strengths:["адаптивность","стратегия","лидерство"], shadow:"Стремление всё предусмотреть может превратить людей в фигуры на доске.", story:"Древний богатырь с мифологическими чертами: умеет оборачиваться зверями и птицами, понимает их язык и ведёт дружину в далёкие походы.", axes:[1,-1,-1,1,0] },
  { id:"svyatogor", name:"Святогор", epithet:"Одинокий исполин", monogram:"СВ", color:"#4b5963", portrait:"Горная мощь", motto:"Не всякую силу способен вынести мир.", description:"Ваш внутренний масштаб трудно вместить в повседневные рамки. Вы независимы, созерцательны и остро чувствуете разницу между возможностью и предназначением.", strengths:["самодостаточность","глубина","мощь"], shadow:"Изоляция и завышенная планка могут лишить вашу силу направления.", story:"Старший богатырь, которого не носит сыра земля. Он странствует по горам, пытается поднять земную тягу и передаёт часть силы Илье Муромцу.", axes:[-1,-1,-1,-1,-1] },
  { id:"sadko", name:"Садко", epithet:"Вдохновенный искатель", monogram:"СА", color:"#247e87", portrait:"Музыка риска", motto:"Услышь возможность там, где другие слышат только шум волн.", description:"Вы творческий предприниматель: тонко чувствуете настроение, способны рискнуть ради большого замысла и соединяете искусство с практической хваткой.", strengths:["воображение","обаяние","предприимчивость"], shadow:"Увлечение успехом и ставками может увести дальше, чем вы намеревались.", story:"Новгородский гусляр, разбогатевший благодаря Морскому царю и ставший купцом. Его путь соединяет искусство, риск, торговлю и возвращение домой.", axes:[1,-1,-1,0,0] },
  { id:"vasily", name:"Василий Буслаев", epithet:"Вольный бунтарь", monogram:"ВБ", color:"#9d3939", portrait:"Неукротимая воля", motto:"Проверяй пределы — даже если на них написано «нельзя».", description:"Вы энергичны, независимы и испытываете правила на прочность. За вами идут благодаря бесстрашию; вы предпочитаете собственный опыт чужим предостережениям.", strengths:["воля","харизма","решительность"], shadow:"Непримиримость к ограничениям может превратить свободу в саморазрушительный вызов.", story:"Новгородский удалец, собирающий собственную ватагу и вступающий в конфликт со всем городом. Даже паломничество не сразу укрощает его дерзость.", axes:[1,-1,-1,-1,1] },
  { id:"nastasya", name:"Настасья Микулишна", epithet:"Свободная воительница", monogram:"НМ", color:"#9b4f6d", portrait:"Равная в поле", motto:"Уважение начинается там, где тебя признают равной.", description:"Вы не принимаете навязанных ролей и доказываете компетентность делом. В близости ищете партнёрство, в споре — честное состязание, в жизни — пространство оставаться собой.", strengths:["самоуважение","независимость","прямота"], shadow:"Необходимость постоянно доказывать силу мешает вовремя принять поддержку.", story:"Поленица — женщина-богатырь, встречающая Добрыню в чистом поле и превосходящая его силой. Их союз возникает лишь после испытания на равенство.", axes:[-1,1,1,-1,1] },
  { id:"stavr", name:"Ставр Годинович", epithet:"Уверенный знаток", monogram:"СГ", color:"#8a6631", portrait:"Гордость знания", motto:"Цени свой дар — но помни, кто помог ему раскрыться.", description:"Вы цените мастерство, статус и признание качества. Уверенно представляете свои достижения и способны сохранять достоинство даже под давлением.", strengths:["компетентность","уверенность","верность"], shadow:"Гордость достижениями может заслонить вклад тех, кто стоит рядом.", story:"Киевский боярин, похваляющийся талантами жены Василисы и попадающий за это в темницу. Спасает его именно её умная и смелая переодетая миссия.", axes:[1,1,1,0,-1] },
  { id:"duke", name:"Дюк Степанович", epithet:"Блистательный новатор", monogram:"ДС", color:"#7c5fa8", portrait:"Посол будущего", motto:"Покажи людям новый масштаб — и старые мерки исчезнут.", description:"Вы приносите в привычную среду новые стандарты. Любите качество, умеете производить впечатление и превращаете сравнение в стимул расти.", strengths:["амбициозность","вкус","новаторство"], shadow:"Впечатление и соревнование порой становятся важнее содержания.", story:"Богатый иноземный гость, поражающий Киев одеждой, конём и великолепием далёкой Индии. Его былина — состязание престижа и воображения.", axes:[1,-1,1,-1,-1] },
  { id:"sukhman", name:"Сухман Одихмантьевич", epithet:"Непризнанный страж", monogram:"СО", color:"#365e70", portrait:"Долг без свидетелей", motto:"Подвиг остаётся подвигом, даже если ему не поверили.", description:"Вы действуете из чувства долга, не нуждаясь в аплодисментах. Самостоятельны, наблюдательны и особенно болезненно воспринимаете недоверие к честно сделанной работе.", strengths:["ответственность","скромность","самоотверженность"], shadow:"Можете замыкаться и отказываться от помощи, когда чувствуете себя недооценённым.", story:"По дороге за добычей один останавливает вражеское войско, но князь не верит рассказу и заключает его в темницу. Это один из самых трагических образов былинного долга.", axes:[-1,1,0,1,-1] },
];

type Question = { text:string; axis:0|1|2|3|4; dir:1|-1 };
const questions: Question[] = [
  {text:"В незнакомой компании я обычно первым начинаю разговор.",axis:0,dir:1},
  {text:"После насыщенного дня мне необходимо побыть в одиночестве.",axis:0,dir:-1},
  {text:"Мне легче влиять на события через людей, чем работать в стороне.",axis:0,dir:1},
  {text:"Я предпочитаю, чтобы мои поступки говорили за меня.",axis:0,dir:-1},
  {text:"Обещание важнее выгоды, даже если обстоятельства изменились.",axis:1,dir:1},
  {text:"Правило стоит нарушить, если оно мешает хорошему решению.",axis:1,dir:-1},
  {text:"В споре я прежде всего ищу справедливый принцип.",axis:1,dir:1},
  {text:"Мне нравится испытывать запреты на прочность.",axis:1,dir:-1},
  {text:"Проверенный способ обычно лучше красивой догадки.",axis:2,dir:1},
  {text:"Меня увлекают идеи, которые пока невозможно доказать.",axis:2,dir:-1},
  {text:"Я замечаю практические детали, которые другие упускают.",axis:2,dir:1},
  {text:"Мне легко представить несколько совершенно разных вариантов будущего.",axis:2,dir:-1},
  {text:"Перед важным решением я стараюсь составить полный план.",axis:3,dir:1},
  {text:"Внезапный поворот скорее бодрит меня, чем выбивает из колеи.",axis:3,dir:-1},
  {text:"Мне спокойнее, когда роли и сроки определены заранее.",axis:3,dir:1},
  {text:"Лучшие решения часто приходят ко мне уже в ходе действия.",axis:3,dir:-1},
  {text:"Чужая беда надолго остаётся у меня в мыслях.",axis:4,dir:1},
  {text:"В тяжёлой ситуации я умею отложить чувства и сделать необходимое.",axis:4,dir:-1},
  {text:"Для меня важнее сохранить человека, чем выиграть спор.",axis:4,dir:1},
  {text:"Прямая правда полезнее утешительных слов.",axis:4,dir:-1},
  {text:"Если группа растеряна, я естественно беру руководство на себя.",axis:0,dir:1},
  {text:"Я готов отвечать за общее дело, даже если не получу признания.",axis:1,dir:1},
  {text:"Мне важнее создать что-то долговечное, чем произвести впечатление.",axis:2,dir:1},
  {text:"Соревнование помогает мне показать свою лучшую сторону.",axis:3,dir:-1},
  {text:"Я легко прошу о помощи, когда собственных сил недостаточно.",axis:4,dir:1},
];

const labels = ["Совсем не согласен","Скорее не согласен","Ни да, ни нет","Скорее согласен","Полностью согласен"];
const axisNames = [["Хранитель","Предводитель"],["Вольный","Верный"],["Визионер","Практик"],["Импровизатор","Стратег"],["Несгибаемый","Сердечный"]];

function score(answers:number[]) {
  const sums=[0,0,0,0,0], counts=[0,0,0,0,0];
  questions.forEach((q,i)=>{ sums[q.axis] += ((answers[i] ?? 3)-3)*q.dir; counts[q.axis]++; });
  return sums.map((v,i)=>v/(counts[i]*2));
}

export default function Home(){
  const [started,setStarted]=useState(false); const [answers,setAnswers]=useState<number[]>([]); const [result,setResult]=useState(false);
  const values=useMemo(()=>score(answers),[answers]);
  const ranked=useMemo(()=>heroes.map(h=>({h,d:h.axes.reduce((s,v,i)=>s+Math.pow(values[i]-v,2),0)})).sort((a,b)=>a.d-b.d),[values]);
  const winner=ranked[0]?.h; const progress=Math.round((answers.filter(Boolean).length/questions.length)*100);
  const reset=()=>{setAnswers([]);setResult(false);setStarted(false);window.scrollTo({top:0,behavior:"smooth"});};
  if(result && winner) return <main className="result-page">
    <header className="mini-head"><button className="brand" onClick={reset}><span>Б</span> БОГАТЫРСКИЙ НРАВ</button><button className="text-btn" onClick={reset}>Пройти заново</button></header>
    <section className="result-hero" style={{"--accent":winner.color} as React.CSSProperties}>
      <figure className="portrait-card"><Image src={`/portraits/${winner.id}.webp`} alt={`Иллюстрация: ${winner.name}`} width={640} height={1000} sizes="(max-width: 760px) 100vw, 42vw" unoptimized /><figcaption><strong>{winner.name}</strong><span>{winner.portrait}</span></figcaption></figure>
      <div className="result-copy"><p className="eyebrow">ВАШ БЫЛИННЫЙ АРХЕТИП</p><h1>{winner.name}</h1><h2>{winner.epithet}</h2><blockquote>«{winner.motto}»</blockquote><p>{winner.description}</p><div className="chips">{winner.strengths.map(x=><span key={x}>{x}</span>)}</div></div>
    </section>
    <section className="result-grid"><article><p className="section-no">01 / В БЫЛИНАХ</p><h3>История архетипа</h3><p>{winner.story}</p></article><article><p className="section-no">02 / ОБРАТНАЯ СТОРОНА</p><h3>Испытание характера</h3><p>{winner.shadow}</p></article></section>
    <section className="profile"><p className="section-no">03 / ВАШ ПРОФИЛЬ</p><h3>Пять граней богатырского нрава</h3>{values.map((v,i)=><div className="axis" key={i}><span>{axisNames[i][0]}</span><div><i style={{left:`${(v+1)*50}%`}}/></div><span>{axisNames[i][1]}</span></div>)}</section>
    <section className="kindred"><p className="section-no">БЛИЗКИЕ АРХЕТИПЫ</p><div>{ranked.slice(1,4).map(({h})=><article key={h.id}><b style={{color:h.color}}>{h.monogram}</b><span><strong>{h.name}</strong><small>{h.epithet}</small></span></article>)}</div></section>
    <footer><p>Результат — культурно-развлекательная интерпретация былинных образов, а не психологический диагноз.</p><button className="primary" onClick={reset}>Пройти ещё раз</button></footer>
  </main>;
  if(started) return <main className="quiz-page"><header className="quiz-head"><button className="brand" onClick={reset}><span>Б</span> БОГАТЫРСКИЙ НРАВ</button><div className="progress"><span>Пройдено {progress}%</span><div><i style={{width:`${progress}%`}}/></div></div></header><section className="questions"><div className="quiz-intro"><p className="eyebrow">25 УТВЕРЖДЕНИЙ · ОКОЛО 5 МИНУТ</p><h1>Отвечайте так, как есть,<br/>а не как хотелось бы.</h1><p>Здесь нет правильных ответов. Выберите, насколько каждое утверждение похоже на вас.</p></div>{questions.map((q,i)=><article className="question" key={q.text}><span className="q-no">{String(i+1).padStart(2,"0")}</span><h2>{q.text}</h2><div className="scale" role="radiogroup" aria-label={q.text}>{labels.map((l,n)=><label key={l} className={answers[i]===n+1?"selected":""}><input type="radio" name={`q${i}`} value={n+1} checked={answers[i]===n+1} onChange={()=>{const a=[...answers];a[i]=n+1;setAnswers(a)}}/><i/><span>{l}</span></label>)}</div></article>)}<div className="finish"><button className="primary" disabled={answers.filter(Boolean).length!==questions.length} onClick={()=>{setResult(true);window.scrollTo({top:0,behavior:"smooth"})}}>Узнать своего богатыря <span>→</span></button>{answers.filter(Boolean).length!==questions.length&&<p>Осталось ответить: {questions.length-answers.filter(Boolean).length}</p>}</div></section></main>;
  return <main className="landing"><nav><div className="brand"><span>Б</span> БОГАТЫРСКИЙ НРАВ</div><p>Психологический тест по мотивам русских былин</p></nav><section className="hero"><div className="rune rune-a">✦</div><div className="hero-copy"><p className="eyebrow">12 АРХЕТИПОВ · 25 ВОПРОСОВ</p><h1>Кто вы<br/>из <em>богатырей?</em></h1><p className="lead">Не тест на знание былин, а путешествие по вашему характеру. Узнайте, чья сила, стратегия и внутренний выбор ближе именно вам.</p><button className="primary" onClick={()=>{setStarted(true);window.scrollTo({top:0})}}>Начать испытание <span>→</span></button><small>Около 5 минут · Без регистрации</small></div><div className="hero-mark"><div className="rings"/><b>Б</b><span>НРАВ<br/>И СИЛА</span></div><div className="rune rune-b">⌁</div></section><section className="promise"><p>Не только <s>сила</s></p><div><article><span>01</span><h2>Характер, а не знания</h2><p>Вопросы о ваших решениях, ценностях и привычках — никаких дат и школьных викторин.</p></article><article><span>02</span><h2>Герои разных циклов</h2><p>От Святогора и Микулы до Садко и Настасьи Микулишны — двенадцать разных судеб.</p></article><article><span>03</span><h2>Свет и тень</h2><p>Результат покажет сильные стороны архетипа и испытание, которое обычно ему сопутствует.</p></article></div></section><section className="cast"><p className="eyebrow">ВАМ МОЖЕТ ВЫПАСТЬ</p><div>{heroes.slice(0,8).map(h=><span key={h.id}>{h.monogram}<small>{h.name}</small></span>)}</div><p>…и ещё четыре былинных характера</p></section><footer><p>Основано на образах русских былин. Тест носит культурно-развлекательный характер.</p><button className="text-btn" onClick={()=>setStarted(true)}>К испытанию ↑</button></footer></main>;
}
