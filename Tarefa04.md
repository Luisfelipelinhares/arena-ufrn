Tarefa 04 - DevOps, Integração e Entrega Contínua (CI/CD) com Testes Automatizados
1. Identificação
- Nome: Luis Felipe Linhares Pereira
- Usuário GitHub: @Luisfelipelinhares
- E-mail acadêmico: luis.felipe.linhares701@ufrn.edu.br
- Projeto utilizado como referência: Arena UFRN
2. Links de entrega

- Pull Request do workflow CI/CD no repositório individual: PENDENTE
- Aplicação publicada: PENDENTE
- Pull Request da tarefa no repositório bsi-tasks: PENDENTE
3. Introdução
Esta atividade aborda a aplicação de práticas DevOps em um projeto de software, utilizando integração contínua, testes automatizados, entrega/implantação contínua e verificação da aplicação após a publicação.

O projeto escolhido como referência é o Arena UFRN, sistema web para gerenciamento e reserva de quadras de areia da Universidade Federal do Rio Grande do Norte. Sua arquitetura é cliente-servidor: o frontend utiliza React e Vite; o backend utiliza Node.js e Express; e a persistência é realizada com SQLite por meio do Prisma ORM. O projeto utiliza pnpm, Jest e Supertest para gerenciamento de dependências e testes automatizados.

O repositório de referência já documenta testes unitários, testes de integração, relatório de cobertura e um workflow de integração contínua no GitHub Actions. A atividade propõe evoluir essa base, acrescentando ou validando as verificações estáticas, os controles de qualidade, a publicação automatizada e os testes pós-deploy.
4. Pesquisa e fundamentação teórica
4.1 Cultura DevOps e testes contínuos (Continuous Testing)
O que é DevOps?
DevOps é uma cultura e um conjunto de práticas que aproximam desenvolvimento de software (Development) e operações de tecnologia (Operations). Seu objetivo é tornar a entrega de software mais frequente, previsível e segura, promovendo colaboração, automação, responsabilidade compartilhada e feedback contínuo.

No modelo tradicional, desenvolvimento e operações frequentemente trabalham com objetivos diferentes. A equipe de desenvolvimento procura implementar funcionalidades e disponibilizar mudanças rapidamente. Já a equipe de operações prioriza disponibilidade, segurança, desempenho e estabilidade. Quando essas equipes trabalham de maneira isolada, surge o chamado “muro da confusão”: o desenvolvimento entrega uma versão e transfere o problema para operações, que pode não conhecer as decisões e particularidades da implementação.

A cultura DevOps procura eliminar esse isolamento por meio de planejamento conjunto, comunicação, automação de builds e testes, infraestrutura versionada, monitoramento e responsabilidade compartilhada pelo ciclo de vida da aplicação. Assim, estabilidade e velocidade deixam de ser objetivos necessariamente opostos: mudanças pequenas, frequentes e verificadas automaticamente tendem a reduzir o risco de grandes entregas.
Continuous Testing e a transformação do papel de QA
No modelo cascata tradicional, as fases de desenvolvimento e testes costumam ser organizadas em etapas sequenciais. Em muitos projetos, a equipe de testes recebe o software depois de grande parte da implementação estar concluída. Consequentemente, defeitos de requisitos, arquitetura ou código podem ser descobertos tardiamente, quando sua correção tende a ser mais cara.

No paradigma DevOps, o Continuous Testing integra verificações automatizadas ao fluxo de desenvolvimento e entrega. Os testes são executados repetidamente em diferentes momentos: durante alterações locais, em commits, em Pull Requests, na integração entre componentes e depois da publicação. O objetivo é obter feedback rápido e contínuo sobre a qualidade do produto.

O papel do profissional de QA também evolui. Em vez de atuar apenas como responsável por testar manualmente uma versão pronta, participa desde a definição dos requisitos e critérios de aceitação, ajuda a identificar riscos, planeja estratégias de teste, automatiza cenários, acompanha métricas e colabora com desenvolvimento e operações. A responsabilidade pela qualidade passa a ser compartilhada por toda a equipe.
Shift-Left Testing
Shift-Left Testing significa antecipar as atividades de teste para etapas iniciais do ciclo de desenvolvimento. Em vez de esperar a aplicação estar pronta, a equipe verifica requisitos, código e componentes assim que são produzidos.

Exemplos:
- Revisar critérios de aceitação antes da implementação.
- Executar análise estática e linter durante o desenvolvimento.
- Executar testes unitários a cada commit ou Pull Request.
- Executar testes de integração antes de permitir o merge.
- Bloquear a integração quando uma verificação obrigatória falhar.
A principal vantagem é detectar defeitos mais cedo, quando há menos código envolvido e a origem do problema é mais fácil de identificar. No pipeline, verificações rápidas devem ocorrer antes das mais demoradas, seguindo a estratégia Fail-Fast.
Shift-Right Testing
Shift-Right Testing complementa a abordagem anterior ao verificar o comportamento do sistema em ambientes próximos ou iguais à produção, inclusive depois da publicação. Testes executados antes do deploy não conseguem reproduzir integralmente todas as condições reais de uso, como configurações de infraestrutura, rede, carga, integrações externas e comportamento dos usuários.

Exemplos:
- Smoke tests: verificações rápidas para confirmar que a aplicação iniciou e que funcionalidades essenciais respondem.
- Health checks: requisições a endpoints como /health para verificar a disponibilidade do serviço.
- Testes sintéticos: execução periódica de ações simuladas para verificar se fluxos essenciais continuam funcionando.
- Observabilidade: análise de logs, métricas e rastreamento distribuído para compreender o comportamento do sistema.
- Monitoramento de produção: acompanhamento de erros, latência, disponibilidade e consumo de recursos.
Shift-Left e Shift-Right não são estratégias concorrentes. A primeira reduz a probabilidade de publicar defeitos conhecidos; a segunda ajuda a detectar problemas que só aparecem no ambiente real. Uma esteira madura utiliza as duas.
4.2 Conceitos de CI, Continuous Delivery e Continuous Deployment
Os três conceitos fazem parte da automação do ciclo de entrega, mas representam níveis diferentes:

Integração Contínua (Continuous Integration — CI): prática de integrar frequentemente as alterações dos desenvolvedores a uma branch compartilhada. Cada integração dispara verificações automatizadas, como instalação, análise estática, build e testes. O objetivo é detectar conflitos e defeitos rapidamente.

Entrega Contínua (Continuous Delivery): amplia a CI ao manter o software validado e pronto para publicação. O pipeline gera um artefato implantável e executa verificações necessárias. A publicação em produção normalmente depende de uma aprovação ou decisão explícita.

Implantação Contínua (Continuous Deployment): automatiza também a publicação em produção. Toda alteração que passa por todas as etapas e critérios de qualidade é implantada sem uma aprovação manual individual.

Portanto, CI verifica continuamente as alterações; Continuous Delivery mantém uma versão pronta para ser publicada; Continuous Deployment publica automaticamente cada alteração aprovada pelo pipeline.
4.3 Papel dos testes de software na esteira CI/CD
Quality Gate
Um Quality Gate é um conjunto de critérios objetivos que uma alteração precisa cumprir para avançar no pipeline. Pode incluir aprovação do linter, sucesso dos testes, cobertura mínima, build válido, análise de vulnerabilidades e outras verificações.

O Quality Gate deve ser bloqueante: se um teste obrigatório falhar, o job termina com erro e as etapas dependentes não são executadas. Isso impede que uma versão comprovadamente defeituosa avance automaticamente para publicação.

Uma esteira que apenas compila e publica o código, sem executar testes adequados, automatiza o transporte do software, mas não oferece evidências suficientes de qualidade. A automação, isoladamente, não torna a entrega segura.
Pirâmide de testes e ordem temporal
A pirâmide de testes recomenda uma quantidade maior de testes unitários, uma quantidade intermediária de testes de integração e uma quantidade menor de testes de sistema ou aceitação.
1. Testes unitários: verificam funções, serviços ou módulos isoladamente, normalmente com dependências simuladas. São rápidos e devem ser executados primeiro.
2. Testes de integração: verificam a comunicação entre componentes, como rotas, controllers, services, ORM e banco de dados. São mais abrangentes e geralmente mais lentos.
3. Testes de sistema/aceitação: verificam o comportamento da aplicação como um todo, considerando fluxos próximos aos requisitos do usuário. Podem envolver interface, API e ambiente completo.
Uma ordem comum no pipeline é: instalação com cache, análise estática, testes unitários, testes de integração, build, testes de aceitação e verificações de segurança. Essa ordem favorece o Fail-Fast, pois falhas simples são identificadas antes de etapas mais custosas.

No Arena UFRN, os testes unitários utilizam mocks do Prisma para verificar serviços isoladamente. Os testes de integração exercitam a aplicação e as rotas HTTP; há também uma suíte de persistência que utiliza um banco SQLite temporário e migrations. Essa separação permite verificar tanto regras isoladas quanto o funcionamento conjunto das camadas.
4.4 Estratégias de deploy e segurança de segredos
Recreate
Na estratégia Recreate, a versão antiga é encerrada antes de a nova versão ser iniciada. É simples de implementar, mas pode provocar indisponibilidade durante a substituição. É adequada principalmente para aplicações que toleram uma breve interrupção.
Rolling Update
No Rolling Update, as instâncias antigas são substituídas gradualmente por novas instâncias. Parte do serviço continua atendendo requisições durante a atualização. É importante verificar compatibilidade entre versões e acompanhar a saúde das instâncias para evitar que uma versão defeituosa seja disponibilizada.
Blue/Green Deployment
No Blue/Green Deployment, existem dois ambientes: o Blue, que atende a versão atual, e o Green, preparado com a nova versão. Depois de validar o Green, o tráfego é direcionado para ele. Se houver problemas, o tráfego pode retornar ao Blue, facilitando o rollback. A estratégia exige infraestrutura suficiente para manter os dois ambientes durante a troca.
Secrets management
Pipelines de CI/CD frequentemente precisam de credenciais para publicar imagens, acessar serviços e realizar deploy. Essas informações devem ser tratadas como segredos.

No GitHub Actions, credenciais devem ser armazenadas em GitHub Secrets ou em mecanismos equivalentes de gerenciamento de segredos. O workflow deve acessá-las por meio de expressões próprias do ambiente, sem gravá-las diretamente no código.

Boas práticas:
- Nunca versionar senhas, tokens, chaves privadas ou arquivos .env reais.
- Manter um .env.example contendo apenas nomes de variáveis e valores fictícios.
- Conceder somente as permissões necessárias ao token ou usuário de deploy.
- Rotacionar credenciais periodicamente e revogá-las quando houver suspeita de vazamento.
- Evitar imprimir segredos nos logs.
- Restringir quais branches e ambientes podem acessar segredos de produção.
- Preferir tokens temporários e autenticação federada quando a plataforma oferecer suporte.
5. Pipeline de Integração Contínua (CI)
O projeto de referência utiliza GitHub Actions. Conforme documentado no README, o workflow existente configura o ambiente, instala dependências, gera o Prisma Client, executa testes unitários e de integração, gera cobertura e realiza análise com SonarQube.

O workflow deve ser conferido no repositório individual e adaptado para garantir os seguintes requisitos:
- Execução em push para main.
- Execução em Pull Requests destinados a main.
- Instalação reproduzível com pnpm e cache.
- Linter ou análise estática.
- Testes unitários.
- Testes de integração.
- Relatório de cobertura.
- Falha do job quando qualquer verificação obrigatória falhar.
Observação de implementação: o README do projeto documenta pnpm test, pnpm test:unit, pnpm test:integration e pnpm test:coverage no diretório backend/. Antes de escrever os comandos definitivos do workflow, deve-se conferir os scripts reais em backend/package.json. Não se deve presumir que exista um script de lint se ele não estiver configurado.
5.1 Evidência da CI
- Link da execução bem-sucedida: PENDENTE.
- Screenshot do workflow verde: PENDENTE.
- Relatório de cobertura: PENDENTE.
6. Pipeline de Entrega/Implantação Contínua (CD)
A etapa de CD deve depender do sucesso da CI e ser executada somente depois de alterações aprovadas na branch principal. O processo recomendado é:
1. Construir a imagem Docker da aplicação.
2. Identificar a imagem com uma tag rastreável, como o hash do commit.
3. Publicar a imagem em um registro de contêiner ou utilizar o mecanismo de deploy da plataforma escolhida.
4. Configurar as variáveis de ambiente no serviço de hospedagem.
5. Implantar a nova versão.
6. Executar o Smoke Test.
7. Considerar o deploy concluído somente se a verificação pós-publicação for aprovada.
6.1 Particularidades do Arena UFRN
O projeto utiliza SQLite em arquivo local. Em plataformas de hospedagem com sistema de arquivos efêmero, os dados podem ser perdidos quando a instância é reiniciada ou substituída. Antes de disponibilizar o sistema publicamente, é necessário escolher uma solução de persistência compatível, como volume persistente oferecido pela plataforma ou migração para um banco de dados gerenciado.

O README também informa que a API ainda não possui autenticação e recomenda uso restrito de homologação. Portanto, não se deve disponibilizar o sistema publicamente com dados reais ou tratar a publicação como ambiente de produção seguro antes de implementar os controles de acesso e as configurações de segurança necessárias.
6.2 Segredos do deploy
As credenciais necessárias devem ser cadastradas em Settings > Secrets and variables > Actions no repositório individual. Os nomes dependem da plataforma selecionada. Nenhum valor secreto deve ser colocado neste documento ou no código-fonte.
- Plataforma de hospedagem: PENDENTE.
- URL pública: PENDENTE.
- Secrets configurados: PENDENTE.
7. Verificação pós-deploy (Smoke Testing)
O Smoke Test é uma verificação rápida executada depois da publicação para confirmar que a aplicação está acessível e que uma funcionalidade essencial responde corretamente.

O projeto de referência documenta atualmente GET / como rota de verificação básica da API. A atividade solicita um endpoint específico, como /health ou /api/status; portanto, é necessário implementar e testar esse endpoint no backend antes de configurar a chamada HTTP no pipeline.

Critério de aprovação:
- A URL pública deve responder à requisição HTTP.
- O endpoint de saúde deve retornar status 200 OK.
- Se a resposta for diferente de 200 ou houver falha de conexão, a etapa de Smoke Test deve falhar.
URL do endpoint publicado: PENDENTE.
Evidência de resposta HTTP 200: PENDENTE.
8. Simulação prática do Quality Gate
A simulação deve demonstrar que uma falha de teste impede a publicação.

Procedimento:
1. Criar uma branch chamada demo/falha-ci.
2. Introduzir uma falha intencional em um teste automatizado, sem alterar o código da branch principal.
3. Enviar a branch ao GitHub e abrir um Pull Request para main.
4. Aguardar a execução do GitHub Actions.
5. Registrar um screenshot ou log em que o teste aparece como falho e o job de CI fica vermelho.
6. Confirmar que o job de deploy não foi executado, pois depende da CI aprovada e ocorre apenas após alterações na branch principal.
7. Corrigir o teste.
8. Enviar a correção e verificar que a esteira fica verde.
Link do Pull Request de demonstração: PENDENTE.
Evidência da falha bloqueando o pipeline: PENDENTE.
Evidência da correção e execução verde: PENDENTE.
9. Conclusão
A adoção de práticas DevOps permite integrar desenvolvimento, testes e operações em um fluxo automatizado e colaborativo. A integração contínua oferece feedback rápido sobre alterações, enquanto a entrega e a implantação contínuas reduzem o trabalho manual necessário para disponibilizar novas versões.

Os testes automatizados e o Quality Gate são fundamentais para que a automação não apenas publique código rapidamente, mas também impeça que alterações com defeitos conhecidos avancem. A combinação de Shift-Left e Shift-Right amplia a verificação: os testes antecipados detectam problemas durante o desenvolvimento, e o monitoramento e os Smoke Tests verificam o comportamento após a publicação.

No Arena UFRN, a estrutura de testes e o workflow de CI documentados oferecem uma base para essa evolução. A conclusão prática da atividade depende da validação do workflow no repositório individual, da configuração de deploy, da persistência dos dados, da criação do endpoint de saúde e do registro das evidências solicitadas.
10. Referências
- GITHUB. GitHub Actions: documentação oficial. Disponível em: https://docs.github.com/pt/actions. Acesso em: 23 nov. 2026.
- GOOGLE CLOUD. DevOps: práticas, cultura e recursos. Disponível em: https://cloud.google.com/architecture/devops. Acesso em: 23 nov. 2026.
- JEST. Jest Documentation. Disponível em: https://jestjs.io/docs/getting-started. Acesso em: 23 nov. 2026.
- PRISMA. Testing. Disponível em: https://www.prisma.io/docs/orm/prisma-client/testing. Acesso em: 23 nov. 2026.
- PAULOANDREHXH. Arena UFRN. Repositório de referência. Disponível em: https://github.com/pauloandrehxh/arena-ufrn. Acesso em: 23 nov. 2026.