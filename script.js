/* ===== Nav scroll & mobile ===== */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== Stats counter ===== */
const stats = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const section = document.querySelector('.stats');
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    statsAnimated = true;
    stats.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isDecimal ? target.toFixed(1) : target;
      }
      requestAnimationFrame(tick);
    });
  }
}

window.addEventListener('scroll', animateStats);
animateStats();

/* ===== Modal content ===== */
const modalData = {
  privacidade: {
    title: 'Privacidade vs. Conveniência',
    body: `
      <p>Serviços “grátis” quase nunca são grátis. O modelo de negócio de muitas plataformas baseia-se na coleta e monetização de dados comportamentais.</p>
      <p><strong>Pontos para refletir:</strong></p>
      <ul>
        <li>Você sabe quais dados cada app coleta e com quem compartilha?</li>
        <li>Aceitaria pagar por serviços em troca de menos rastreamento?</li>
        <li>A conveniência de hoje pode gerar vulnerabilidades amanhã (vazamentos, perfilamento, manipulação).</li>
      </ul>
      <div class="prompt">Pergunta-chave: até que ponto a personalização justifica abrir mão do controle sobre a própria identidade digital?</div>
    `
  },
  liberdade: {
    title: 'Liberdade de expressão vs. Segurança',
    body: `
      <p>Redes sociais tornaram-se praças públicas de fato. Moderação excessiva pode silenciar vozes legítimas; moderação insuficiente pode amplificar ódio e violência.</p>
      <p><strong>Pontos para refletir:</strong></p>
      <ul>
        <li>Quem deve definir as regras: plataformas, governos ou a comunidade?</li>
        <li>Algoritmos de moderação erram — e o custo do erro pode ser alto.</li>
        <li>Contextos culturais e legais variam enormemente entre países.</li>
      </ul>
      <div class="prompt">Pergunta-chave: é possível proteger pessoas vulneráveis sem criar um sistema de censura opaco e centralizado?</div>
    `
  },
  ia: {
    title: 'IA: progresso vs. risco',
    body: `
      <p>Modelos generativos e sistemas autônomos prometem ganhos enormes em produtividade e descoberta científica. Ao mesmo tempo, concentram poder em poucas empresas e levantam questões de alinhamento, emprego e responsabilidade.</p>
      <p><strong>Pontos para refletir:</strong></p>
      <ul>
        <li>Devemos pausar o desenvolvimento de modelos cada vez maiores?</li>
        <li>Como garantir que IA não perpetue ou amplifique discriminação?</li>
        <li>Quem responde quando um sistema autônomo causa dano?</li>
      </ul>
      <div class="prompt">Pergunta-chave: a velocidade da inovação está ultrapassando nossa capacidade de governança ética e democrática?</div>
    `
  },
  atencao: {
    title: 'Atenção como recurso escasso',
    body: `
      <p>O modelo de “economia da atenção” recompensa o tempo de tela. Design persuasivo — notificações, feeds infinitos, recompensas variáveis — compete diretamente com sono, estudo, relações e foco profundo.</p>
      <p><strong>Pontos para refletir:</strong></p>
      <ul>
        <li>Você consegue estimar quanto tempo “não intencional” passa em apps?</li>
        <li>Design ético (tempo bem gasto) é compatível com modelos de publicidade?</li>
        <li>Crianças e adolescentes são especialmente vulneráveis a esses mecanismos.</li>
      </ul>
      <div class="prompt">Pergunta-chave: a atenção deveria ser tratada como um bem público a ser protegido, e não apenas como commodity de mercado?</div>
    `
  },
  verdade: {
    title: 'Verdade vs. Narrativa',
    body: `
      <p>Deepfakes, conteúdo sintético e câmaras de eco tornam cada vez mais difícil distinguir fato de ficção. A confiança em instituições e mídia tradicional cai, enquanto narrativas paralelas florescem.</p>
      <p><strong>Pontos para refletir:</strong></p>
      <ul>
        <li>Ferramentas de verificação de fatos escalam na mesma velocidade da desinformação?</li>
        <li>Educação midiática é suficiente ou precisamos de mudanças estruturais nas plataformas?</li>
        <li>O relativismo extremo (“cada um tem a sua verdade”) mina a base de qualquer debate público?</li>
      </ul>
      <div class="prompt">Pergunta-chave: é possível reconstruir um mínimo de realidade compartilhada em um ambiente projetado para polarizar e engajar?</div>
    `
  },
  acesso: {
    title: 'Inclusão digital vs. exclusão',
    body: `
      <p>Internet de qualidade, dispositivos e habilidades digitais tornaram-se pré-requisitos para educação, trabalho, serviços públicos e participação cívica. Quem fica de fora fica cada vez mais atrás.</p>
      <p><strong>Pontos para refletir:</strong></p>
      <ul>
        <li>Conectividade deve ser tratada como direito fundamental?</li>
        <li>Como equilibrar investimento privado e políticas públicas de inclusão?</li>
        <li>A alfabetização digital inclui pensamento crítico sobre privacidade e desinformação?</li>
      </ul>
      <div class="prompt">Pergunta-chave: a próxima geração de tecnologias (IA, realidade aumentada) vai reduzir ou aprofundar as desigualdades de acesso?</div>
    `
  }
};

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.open;
    const data = modalData[key];
    if (!data) return;
    modalBody.innerHTML = `<h3 id="modalTitle">${data.title}</h3>${data.body}`;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

modal.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

/* ===== Quiz ===== */
const questions = [
  {
    q: 'Você aceitaria um serviço “grátis” que coleta e vende seus dados de navegação em troca de personalização?',
    options: [
      { text: 'Sim, a conveniência vale a pena', score: 0 },
      { text: 'Só se eu tiver controle claro sobre o que é coletado', score: 1 },
      { text: 'Não, prefiro pagar ou abrir mão do serviço', score: 2 }
    ]
  },
  {
    q: 'Plataformas devem remover conteúdos que consideram “desinformação”, mesmo sem consenso científico ou jurídico claro?',
    options: [
      { text: 'Sim, a proteção da sociedade vem primeiro', score: 0 },
      { text: 'Depende do contexto e da transparência do processo', score: 1 },
      { text: 'Não, isso abre espaço para censura arbitrária', score: 2 }
    ]
  },
  {
    q: 'Sobre o desenvolvimento de IA avançada, você acredita que:',
    options: [
      { text: 'Devemos acelerar ao máximo — os benefícios superam os riscos', score: 0 },
      { text: 'Precisamos de regulação forte e internacional agora', score: 1 },
      { text: 'Deveria haver uma pausa até entendermos melhor os riscos', score: 2 }
    ]
  },
  {
    q: 'Você considera o tempo de tela excessivo um problema pessoal ou principalmente de design das plataformas?',
    options: [
      { text: 'Principalmente responsabilidade individual', score: 0 },
      { text: 'Uma combinação dos dois', score: 1 },
      { text: 'Principalmente design persuasivo das empresas', score: 2 }
    ]
  },
  {
    q: 'Acesso à internet de qualidade deveria ser tratado como:',
    options: [
      { text: 'Um produto de mercado como qualquer outro', score: 0 },
      { text: 'Um serviço essencial com alguma regulação', score: 1 },
      { text: 'Um direito fundamental garantido pelo Estado', score: 2 }
    ]
  }
];

let currentQ = 0;
let totalScore = 0;

const quizContent = document.getElementById('quizContent');
const quizResult = document.getElementById('quizResult');
const quizBar = document.getElementById('quizBar');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const quizRestart = document.getElementById('quizRestart');

function renderQuestion() {
  const q = questions[currentQ];
  quizBar.style.width = `${(currentQ / questions.length) * 100}%`;
  quizContent.innerHTML = `
    <div class="quiz-question">
      <h3>${q.q}</h3>
      <div class="quiz-options">
        ${q.options.map((o, i) => `
          <button class="quiz-option" data-score="${o.score}">${o.text}</button>
        `).join('')}
      </div>
    </div>
  `;
  quizContent.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      totalScore += parseInt(btn.dataset.score, 10);
      currentQ++;
      if (currentQ < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });
  });
}

function showResult() {
  quizBar.style.width = '100%';
  quizContent.hidden = true;
  quizResult.hidden = false;

  let title, text;
  if (totalScore <= 3) {
    title = 'Perfil: Otimista tecnológico';
    text = 'Você tende a confiar nos benefícios da inovação e valoriza liberdade de escolha e mercado. Seu desafio pode ser considerar riscos sistêmicos e impactos de longo prazo que não aparecem de imediato.';
  } else if (totalScore <= 7) {
    title = 'Perfil: Equilibrista';
    text = 'Você busca o meio-termo: reconhece benefícios da tecnologia, mas exige transparência, controle e responsabilização. Essa postura costuma ser a mais realista — e também a mais exigente de diálogo e nuance.';
  } else {
    title = 'Perfil: Precavido digital';
    text = 'Você prioriza proteção, direitos e cautela diante de riscos. Valoriza regulação e desenho ético. Seu desafio pode ser não bloquear avanços legítimos por excesso de prudência — o equilíbrio continua sendo a arte.';
  }

  resultTitle.textContent = title;
  resultText.textContent = text;
}

quizRestart.addEventListener('click', () => {
  currentQ = 0;
  totalScore = 0;
  quizResult.hidden = true;
  quizContent.hidden = false;
  renderQuestion();
});

renderQuestion();

/* ===== Share ===== */
document.getElementById('shareBtn').addEventListener('click', async () => {
  const shareData = {
    title: 'Dilemas Digitais',
    text: 'Explore os grandes dilemas éticos da era digital — privacidade, IA, atenção, verdade e mais.',
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  } catch (_) {}
});