# Solução Implementada

## Funcionalidades

### 1. Home Page
**Descrição:** Página inicial da plataforma SafeGrow, apresentando o projeto, sua missão e direcionando o usuário para as demais seções da aplicação.

**Acesso:** Disponível para todos os usuários ao acessar o endereço principal da aplicação (`index.html`).

---

### 2. Chat com Inteligência Artificial
**Descrição:** O usuário descreve uma situação do cotidiano e a IA analisa o relato, identificando possíveis sinais de adultização infantil e oferecendo orientações personalizadas. Utiliza a API do Google Gemini.

**Estrutura de dados associada:**
```json
{
  "mensagem": "Minha filha de 8 anos fica responsável por cuidar do irmão mais novo enquanto trabalho.",
  "resposta_ia": "A situação descrita apresenta características de adultização infantil...",
  "timestamp": "2026-06-28T10:30:00"
}
```

**Acesso:** Disponível na página `avaliacao.html`.

---

### 3. Cards de Notícias com Filtro de Pesquisa
**Descrição:** Exibe notícias e artigos relacionados à adultização infantil em formato de cards. Permite filtrar por categoria ou palavra-chave. Administradores podem adicionar novas notícias.

**Estrutura de dados associada:**
```json
{
  "id": 1,
  "titulo": "Como identificar sinais de adultização infantil",
  "descricao": "Especialistas apontam comportamentos que indicam...",
  "categoria": "Educação",
  "imagem": "url_da_imagem",
  "data": "2026-06-01"
}
```

**Acesso:** Disponível na página `filtro.html`.

---

### 4. Formulário de Cadastro de Usuário
**Descrição:** Permite que novos usuários se registrem na plataforma informando nome, e-mail e senha. Os dados são armazenados via localStorage.

**Estrutura de dados associada:**
```json
{
  "nome": "Marcos Oliveira",
  "email": "marcos@email.com",
  "senha": "***",
  "dataCadastro": "2026-06-28"
}
```

**Acesso:** Disponível na página de cadastro.

---

### 5. Tela de Login e Autenticação
**Descrição:** Permite que usuários cadastrados acessem a plataforma com e-mail e senha. A autenticação é validada contra os dados armazenados no localStorage.

**Estrutura de dados associada:**
```json
{
  "email": "marcos@email.com",
  "senha": "***",
  "logado": true
}
```

**Acesso:** Disponível na página de login.

---

### 6. Página de Soluções e Recursos
**Descrição:** Reúne recursos educativos, links úteis e orientações práticas para pais, educadores e profissionais que desejam combater a adultização infantil.

**Acesso:** Disponível como uma das seções principais da navegação.

---

### 7. Cabeçalho (Header) com Navegação
**Descrição:** Componente presente em todas as páginas, contendo o logotipo do SafeGrow e o menu de navegação entre as seções.

**Acesso:** Exibido automaticamente em todas as páginas.

---

### 8. Rodapé (Footer) com Canais de Apoio
**Descrição:** Componente presente em todas as páginas, exibindo informações institucionais e links para canais de denúncia como Disque 100 e CVV.

**Acesso:** Exibido automaticamente em todas as páginas (`footer.html`).

---

## Estruturas de Dados

### Usuários
```json
{
  "usuarios": [
    {
      "id": 1,
      "nome": "Marcos Oliveira",
      "email": "marcos@email.com",
      "senha": "senha123",
      "dataCadastro": "2026-06-28"
    }
  ]
}
```

### Notícias
```json
{
  "noticias": [
    {
      "id": 1,
      "titulo": "Como identificar sinais de adultização infantil",
      "descricao": "Especialistas apontam comportamentos que indicam...",
      "categoria": "Educação",
      "imagem": "assets/noticia1.jpg",
      "data": "2026-06-01"
    }
  ]
}
```

### Sessão do Usuário
```json
{
  "usuarioLogado": {
    "email": "marcos@email.com",
    "nome": "Marcos Oliveira"
  }
}
```

---

## Módulos e APIs

### Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| HTML5 | Estruturação das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript (Vanilla) | Lógica, manipulação do DOM e integração com APIs |
| localStorage / sessionStorage | Armazenamento local de dados de usuários e sessão |

### APIs Utilizadas

| API | Finalidade |
|---|---|
| Google Gemini API | Processamento de linguagem natural para o chat com IA. Recebe o relato do usuário e retorna análise sobre adultização infantil com orientações personalizadas |
