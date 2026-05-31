# TechStore - Projeto Web com SCSS Modular e Vite

## 📋 Descrição

Projeto TechStore refatorado com arquitetura SCSS modular, integrado com Vite e suporte a múltiplos temas de cores responsivos.

## ✨ Funcionalidades Principais

### 1. **Arquitetura SCSS Modular**
- `_variables.scss`: Variáveis globais (tipografia, cores, espaçamento, breakpoints)
- `_typography.scss`: Estilos de tipografia com variáveis para font-style, font-weight e font-color
- `_themes.scss`: Três temas de cores (Default, Dark, Green)
- `_components.scss`: Estilos reutilizáveis (cards, navbar, botões, formulários)
- `_responsive.scss`: Grid responsivo e mixins de breakpoints
- `main.scss`: Arquivo principal que importa todos os módulos

### 2. **Temas de Cores**
- **Tema Default**: Azul (#0066cc) e Laranja (#ff8c00)
- **Tema Dark**: Tema escuro com cores neutras e acentos em azul claro
- **Tema Green**: Tema ecológico com verde (#059669) e verde claro (#84cc16)

Cada tema possui:
- Cores primárias e secundárias
- Cores de estado (sucesso, aviso, erro, info)
- Variáveis CSS para transição suave

### 3. **Responsividade**
- Breakpoints: xs, sm (576px), md (768px), lg (992px), xl (1200px), 2xl (1400px)
- Grid system com 12 colunas flexível
- Design mobile-first
- Componentes adaptativos (navbar, cards, botões)

### 4. **Tipografia**
Variáveis SCSS para:
- Font families: primária (Segoe UI) e secundária (Courier New)
- Font weights: light (300), normal (400), semibold (600), bold (700), extrabold (800)
- Font sizes: xs (12px) até 4xl (36px)
- Todas aplicadas a elementos semânticos (h1-h6, p, span, etc.)

## 🚀 Como Utilizar

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Compilar para produção
npm run build
```

A pasta `dist/` conterá os arquivos otimizados e minificados.

### Preview do Build

```bash
# Visualizar build em produção local
npm run preview
```

### Linting e Formatação

```bash
# Verificar código com ESLint
npm run lint

# Formatar código com Prettier
npm run format
```

## 🎨 Como Usar os Temas

### Alternância de Temas via JavaScript

Um botão tema-switcher é automaticamente adicionado à navbar. Clique para alternar entre os temas:

```javascript
// No console do navegador
theme.set('default')  // Tema azul/laranja
theme.set('dark')     // Tema escuro
theme.set('green')    // Tema verde
theme.toggle()        // Alternar para próximo tema
```

### Variáveis CSS Disponíveis

```css
--color-primary
--color-primary-dark
--color-primary-light
--color-secondary
--color-secondary-dark
--color-secondary-light
--color-background
--color-surface
--color-text
--color-text-light
--color-border
--color-success
--color-warning
--color-danger
--color-info
```

## 📁 Estrutura do Projeto

```
desafio_pratico/
├── src/
│   ├── main.js                 # Entry point (importa estilos e script)
│   ├── script.js              # Lógica de carrinhoversatilidade
│   └── styles/
│       ├── main.scss          # Arquivo principal de estilos
│       ├── _variables.scss    # Variáveis globais
│       ├── _typography.scss   # Tipografia
│       ├── _themes.scss       # Temas de cores
│       ├── _components.scss   # Componentes
│       └── _responsive.scss   # Responsividade
├── index.html                 # Página inicial
├── produtos.html              # Página de produtos
├── contato.html              # Página de contato
├── vite.config.js            # Configuração do Vite
├── eslint.config.js          # Configuração do ESLint
├── .prettierrc.json          # Configuração do Prettier
├── package.json              # Dependências e scripts
└── dist/                     # Build final (gerado)
```

## 🔧 Configuração de Breakpoints

Use o mixin `@include respond-to()` para media queries:

```scss
.element {
  // Mobile primeiro
  font-size: 12px;

  @include respond-to('sm') {
    font-size: 14px;
  }

  @include respond-to('md') {
    font-size: 16px;
  }

  @include respond-to('lg') {
    font-size: 18px;
  }
}
```

## 📦 Dependências Principais

- **Vite**: Build tool e dev server
- **Sass**: Pré-processador CSS
- **ESLint**: Linter JavaScript
- **Prettier**: Formatador de código
- **Husky**: Git hooks
- **Bootstrap 5.3.8**: Framework CSS (framework base)

## 🌐 URL do Repositório

[GitHub - desafio_pratico](https://github.com/bernardoribeiro17/desafio_pratico)

**Branch Feature SASS**: `feature-sass`

## ✅ Checklist de Entrega

- [x] Código de ferramentas de desenvolvimento enviado para `master`
- [x] Branch `feature-sass` criada e atualizada
- [x] SCSS modular integrado ao Vite
- [x] Variáveis de tipografia (font-style, font-weight, font-color) criadas
- [x] 3 temas de cores implementados
- [x] Layout responsivo em todos os breakpoints
- [x] Commits e push realizados
- [x] Configuração ESLint atualizada
- [x] Build testado e funcionando

## 📝 Notas Importantes

1. **Tema Persistente**: O tema escolhido é salvo em localStorage e persiste ao recarregar a página
2. **Compatibilidade**: Os temas usam CSS variables para máxima compatibilidade e performance
3. **Minificação**: Build automático minifica CSS, JS e HTML usando Terser e SWC
4. **Git Hooks**: Husky executa ESLint e Prettier automaticamente ao fazer commit

## 🚀 Próximos Passos Sugeridos

1. Adicionar testes unitários com Vitest
2. Implementar PWA (Progressive Web App)
3. Otimizar imagens com processamento automático
4. Adicionar analytics and tracking
5. Melhorar acessibilidade (WCAG 2.1)

---

**Desenvolvido com ❤️ durante a aula de CSS/SCSS**
