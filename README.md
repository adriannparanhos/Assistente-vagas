# Job Application Tracker (SaaS)

Plataforma SaaS desenvolvida para otimizar a jornada do candidato em processos seletivos. O sistema permite o rastreamento em formato Kanban, análise de métricas de conversão e testes A/B de currículos, garantindo decisões baseadas em dados para maximizar a aprovação em etapas de triagem (ATS).

## 🚀 Stack Tecnológica

* **Framework:** React + Vite (SPA)
* **Linguagem:** TypeScript (Strict Mode)
* **Estilização:** Tailwind CSS v4
* **Roteamento:** React Router v6
* **Gerenciamento de Estado:** Zustand *(A ser implementado)*
* **Drag and Drop:** dnd-kit *(A ser implementado)*
* **Formulários e Validação:** React Hook Form + Zod *(A ser implementado)*

## 🏗️ Arquitetura (Feature-Based)

O projeto adota uma arquitetura modular baseada em *Features*, inspirada em princípios de *Clean Architecture* e DDD. O objetivo é manter o domínio isolado da interface e garantir alta coesão e baixo acoplamento.

* `/src/core`: Configurações globais, provedores, rotas e clientes HTTP.
* `/src/shared`: Componentes UI genéricos (botões, modais, inputs) e hooks utilitários.
* `/src/features`: Módulos de negócio. Cada feature possui seu próprio `/domain` (tipos/entidades), `/components` e `/store`.
  * `jobs/`: Gestão das candidaturas (Entidade central).
  * `resumes/`: Gestão das versões de currículos.
  * `analytics/`: Cálculo de métricas e conversão.
* `/src/pages`: Camada de orquestração. Componentes que importam o Layout e as Features para compor as telas.

## 🗺️ Roadmap de Desenvolvimento (Fonte da Verdade)

Este é o passo a passo de implementação do sistema, focado em entregar valor de forma iterativa (MVP).

### Fase 1: Fundação e Layout (✅ Concluído)
- [x] Configuração Vite + React + TS.
- [x] Configuração Tailwind v4.
- [x] Definição da Entidade Base `JobApplication` (Domínio).
- [x] Construção do `MainLayout` (Sidebar e Topbar).
- [x] Configuração de Rotas base (`/` e `/dashboard`).

### Fase 2: O Motor de Estado (Mock e Store)
- [ ] Criar o estado global da aplicação utilizando **Zustand**.
- [ ] Popular o estado inicial com dados simulados (*Mock Data*) contendo pelo menos 5 candidaturas em status diferentes ('APPLIED', 'HR_INTERVIEW', etc.).
- [ ] Garantir que os tipos do estado respeitem estritamente as interfaces definidas em `/features/jobs/domain/types.ts`.

### Fase 3: O Quadro Kanban (Visualização e Interação)
- [ ] Construir o componente `KanbanBoard` e `KanbanColumn`.
- [ ] Construir o componente `JobCard` exibindo empresa, vaga, data de aplicação e tags visuais (ex: versão do currículo usado).
- [ ] Integrar o `@dnd-kit/core` para permitir arrastar e soltar (Drag and Drop) os cards entre as colunas.
- [ ] Atualizar o status da entidade `JobApplication` no Zustand ao soltar o card.

### Fase 4: Formulários e Ingestão de Dados
- [ ] Instalar e configurar `react-hook-form` e `zod`.
- [ ] Criar o schema de validação (`jobSchema`) para novas vagas.
- [ ] Desenvolver um Modal/Slide-over universal em `shared/ui` para abrigar formulários.
- [ ] Implementar o `JobForm` para criar e editar vagas manualmente, atualizando o Zustand.

### Fase 5: Dashboards e Inteligência de Dados
- [ ] Criar a lógica de cálculo de métricas em `/features/analytics/domain` (Ex: Taxa de conversão geral = Entrevistas / Aplicações).
- [ ] Implementar componentes visuais de indicadores (Cards numéricos, barras de progresso).
- [ ] Construir a view do Dashboard calculando a eficácia (Teste A/B) entre diferentes versões de currículo registradas no Kanban.

## 🧠 Decisões de Design (ADR - Architecture Decision Records)
* **Por que Feature-Based e não agrupamento por tipo (ex: todos os hooks juntos)?** Facilita a manutenção em escala. Se a regra de negócio de "Vagas" mudar, altera-se apenas a pasta `features/jobs`, não quebrando o resto do app.
* **Por que Zustand e não Redux/Context API?** O Context API causa re-renderizações desnecessárias em estruturas complexas como Kanban. O Redux possui muito *boilerplate*. Zustand oferece gerenciamento atômico e performático com curva de aprendizado rápida.