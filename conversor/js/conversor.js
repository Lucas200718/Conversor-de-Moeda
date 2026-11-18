const form = document.querySelector('#form-conv');
const campoValor = document.querySelector('#valor');
const campoMoeda = document.querySelector('#moeda');
const textoStatus = document.querySelector('#status');
const erroMensagem = document.querySelector('#erro');
const resultado = document.querySelector('#resultado');

let taxas = {};
textoStatus.textContent = 'Carregando cotações...';

fetch('dados/taxas.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Falha ao carregar taxas (${response.status})`);
    }
    return response.json();
  })
  .then(data => {
    taxas = data;
    textoStatus.textContent = 'Cotações carregadas.';
  })
  .catch(error => {
    console.error('Erro ao carregar cotações:', error);
    textoStatus.textContent = 'Erro ao carregar cotações.';
  });

form.addEventListener('submit', event => {
  event.preventDefault();
  erroMensagem.textContent = '';
  resultado.textContent = '';

  const valor = Number(campoValor.value);
  const moeda = campoMoeda.value;

  if (campoValor.value.trim() === '' || !Number.isFinite(valor)) {
    erroMensagem.textContent = 'Digite um valor válido.';
    return;
  }

  if (valor < 0) {
    erroMensagem.textContent = 'Digite um valor positivo.';
    return;
  }

  const taxa = taxas[moeda];
  if (!taxa) {
    erroMensagem.textContent = 'Não há cotação disponível para essa moeda.';
    return;
  }

  const convertido = valor / taxa;
  resultado.textContent = `R$ ${valor.toFixed(2)} = ${convertido.toFixed(2)} ${moeda}`;
});
