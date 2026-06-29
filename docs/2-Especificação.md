# Especificações Do Projeto

## Matriz de Alinhamento (CSD)

| Certezas | Suposições | Dúvidas |
|---|---|---|
| Lei 15.211/2025 (Lei Felca) prevê filtros para limitar acesso de menores a conteúdos de exploração, pornografia e violência | Excesso de tempo de tela pode aumentar a exposição de crianças e adolescentes | Como são identificados os predadores na internet? |
| Facilidade de localizar e disseminar conteúdos sem supervisão na internet | Inserção de crianças em ambientes adultos (festas, bebidas e drogas) aumenta riscos | Quais são as punições para esse tipo de crime? |
| Falta de regulamentação em algumas plataformas pode facilitar esses crimes | Falta de supervisão pode facilitar contato com predadores online | Como demonstrar o perigo que crianças sofrem ao passar por esse tipo de situação? |

## Mapa de Stakeholders

- **Pessoas fundamentais:** crianças, adolescentes e suas famílias
- **Pessoas importantes:** escolas, redes sociais, influenciadores digitais e jogos digitais (ex: Roblox, GTA)
- **Pessoas influenciadoras:** Estatuto da Criança e do Adolescente, psicopedagogos e conselho tutelar

## Personas

### Persona 1 — Marcos Oliveira

Marcos tem 29 anos, trabalha como vendedor e tem como hobbies redes sociais, jogos online e assistir vídeos curtos. Usa celular e notebook em casa e na escola, acessando redes sociais e sites educativos. Sua personalidade é desinformada sobre o tema, prática, curiosa e aberta a aprender. Seu sonho é ser um bom pai e garantir o bem-estar do filho.

**Objetivos:** entender a adultização infantil, proteger o filho e encontrar orientações práticas.

**Mapa de Valor:** suas tarefas são cuidar do filho, entender seu comportamento e aprender como protegê-lo. Seus ganhos são aprender de forma simples e rápida e ter acesso a dicas práticas. Suas dores são a falta de conhecimento sobre o tema e o excesso de informação confusa.

---

### Persona 2 — Mariana Souza

Mariana tem 34 anos, é professora e tem como hobbies ler, assistir vídeos sobre educação infantil e passar tempo com a filha. Utiliza celular e notebook diariamente, tanto em casa quanto na escola. Sua personalidade é cuidadosa, atenta, protetora e crítica em relação à mídia. Seu sonho é proporcionar uma infância saudável e segura para sua filha.

**Objetivos:** entender melhor o que é a adultização infantil, identificar sinais no comportamento da filha e aprender formas de protegê-la.

**Mapa de Valor:** suas tarefas são buscar informações sobre educação infantil e orientar o comportamento da criança. Seus ganhos são sentir-se segura como mãe e ter acesso a orientações confiáveis. Suas dores são o medo da influência negativa da mídia e a insegurança sobre como agir.

---

### Persona 3 — Patrícia Gomes

Patrícia tem 42 anos, é assistente social e tem como hobbies participar de grupos de pais e ler sobre comportamento infantil. Usa celular e computador no trabalho e em casa. Sua personalidade é empática, observadora, engajada e defensora dos direitos das crianças. Seu sonho é contribuir para uma sociedade mais consciente.

**Objetivos:** buscar conteúdos confiáveis para orientar famílias, identificar casos de adultização infantil e compartilhar informações educativas com a comunidade.

**Mapa de Valor:** suas tarefas são orientar famílias e identificar casos de adultização. Seus ganhos são acesso a materiais educativos de qualidade e facilidade para compartilhamento. Suas dores são a falta de materiais acessíveis e a resistência das pessoas ao tema.

---

## Histórias de Usuários

| EU COMO... | QUERO/PRECISO... | PARA... |
|---|---|---|
| Responsável (pai/mãe) | Obter informações sobre adultização infantil | Compreender como isso pode impactar meu filho |
| Responsável | Obter instruções práticas | Prevenir comportamentos não apropriados para a idade da criança |
| Educador | Localizar recursos pedagógicos | Promover a conscientização entre os estudantes |
| Responsável | Reconhecer indícios de adultização infantil | Agir de forma rápida e proteger a criança |
| Usuário do site | Navegar de maneira simples e estruturada | Localizar informações de maneira eficiente |
| Responsável | Consultar exemplos de situações cotidianas | Identificar e prevenir comportamentos que promovam a adultização |
| Usuário | Utilizar um chat com IA | Descrever uma situação e receber orientação personalizada |
| Usuário | Cadastrar-me na plataforma | Ter acesso a funcionalidades e personalizar minha experiência |
| Usuário | Filtrar e buscar notícias | Encontrar rapidamente conteúdos relevantes |

## Proposta de Valor

**Produtos e Serviços:** plataforma web educativa sobre adultização infantil com conteúdos explicativos, notícias filtráveis, chat com inteligência artificial, área de cadastro e login, página de soluções e recursos.

**Criadores de Ganhos:** sensação de segurança ao cuidar das crianças, facilidade para aprender e aplicar o conhecimento, apoio na educação infantil saudável e conscientização social sobre o problema.

**Analgésicos:** explicações simples que reduzem a confusão sobre o tema, conteúdos confiáveis que diminuem a insegurança dos pais e navegação rápida para usuários com pouco tempo.

## Requisitos

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RF-001 | Permitir que o usuário acesse um chat com IA para descrever situações e receber orientações | ALTA |
| RF-002 | Exibir cards de notícias relacionadas à adultização infantil | ALTA |
| RF-003 | Permitir filtragem e busca de notícias por categoria ou palavra-chave | ALTA |
| RF-004 | Permitir cadastro de novos usuários | ALTA |
| RF-005 | Permitir login e autenticação de usuários cadastrados | ALTA |
| RF-006 | Exibir página de soluções com recursos e orientações práticas | MÉDIA |
| RF-007 | Exibir rodapé com canais de apoio e links úteis | MÉDIA |
| RF-008 | Exibir cabeçalho com navegação entre as páginas | ALTA |
| RF-009 | Permitir que administradores adicionem novas notícias | MÉDIA |

### Requisitos Não Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RNF-001 | O sistema deve ser responsivo para funcionar em dispositivos móveis e desktops | ALTA |
| RNF-002 | O chat com IA deve retornar respostas em até 10 segundos | MÉDIA |
| RNF-003 | A aplicação deve funcionar nos principais navegadores modernos (Chrome, Firefox, Edge) | ALTA |
| RNF-004 | O sistema não deve utilizar backend próprio, funcionando com localStorage e APIs externas | ALTA |
| RNF-005 | A interface deve ser acessível para usuários com diferentes níveis de letramento digital | MÉDIA |

## Restrições

| ID | Restrição |
|---|---|
| 01 | O projeto deverá ser entregue até o final do semestre |
| 02 | Não pode ser desenvolvido um módulo de backend |
| 03 | A aplicação deve ser desenvolvida apenas com HTML, CSS e JavaScript |