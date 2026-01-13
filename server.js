import "dotenv/config";
import app from "./src/app.js";
import conectaNaDatabase from "./src/config/dbConnect.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const conexao = await conectaNaDatabase();

    conexao.on("error", (error) => {
      console.error("Erro de conexão:", error);
    });

    conexao.once("open", () => {
      console.log("Conexão com o banco realizada com sucesso");
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar servidor:", error);
    process.exit(1);
  }
}

startServer();
