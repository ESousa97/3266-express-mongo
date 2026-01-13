# 🔐 Política de Segurança

## 📋 Versões Suportadas

Atualmente oferecemos suporte de segurança para as seguintes versões:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.x.x  | ✅ Sim             |
| < 1.0  | ❌ Não             |

## 🚨 Reportando uma Vulnerabilidade

A segurança deste projeto é levada a sério. Se você descobrir uma vulnerabilidade de segurança, siga estas etapas:

### 📬 Como Reportar

1. **NÃO** abra uma issue pública para vulnerabilidades de segurança
2. Envie um e-mail para o mantenedor através do [LinkedIn](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
3. Inclua o máximo de informações possível:
   - Tipo de vulnerabilidade
   - Caminho completo dos arquivos afetados
   - Localização do código vulnerável (tag/branch/commit ou URL)
   - Instruções para reprodução
   - Prova de conceito ou exploit (se possível)
   - Impacto potencial

### ⏱️ Tempo de Resposta

- **Confirmação inicial**: 48 horas
- **Avaliação preliminar**: 7 dias
- **Correção (vulnerabilidades críticas)**: 14 dias
- **Correção (vulnerabilidades moderadas/baixas)**: 30 dias

### 🔄 Processo de Divulgação

1. Recebimento e confirmação do relatório
2. Investigação e validação
3. Desenvolvimento do patch
4. Lançamento da correção
5. Divulgação pública coordenada (se aplicável)

## 🛡️ Práticas de Segurança

Este projeto segue estas práticas de segurança:

- ✅ Dependências são auditadas regularmente (`npm audit`)
- ✅ Variáveis sensíveis são mantidas em `.env` (não commitado)
- ✅ Validação de input em todos os endpoints
- ✅ Análise estática de código via CodeQL
- ✅ Dependabot habilitado para atualizações automáticas

## 📚 Recursos de Segurança

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## 🙏 Reconhecimentos

Agradecemos a todos que reportam vulnerabilidades de forma responsável. Contribuidores que reportarem vulnerabilidades válidas serão reconhecidos (com sua permissão) no CHANGELOG.
