import S from "./cadastro.module.scss";
import cadastroImg from "../../assets/img/cadastro.jpeg";
import { useState } from "react";
import { api, getApiError } from "../../services/api";

export default function Cadastro() {
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function cadastrar(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const dados = Object.fromEntries(new FormData(form));
    setEnviando(true);
    setMensagem("");
    try {
      await api.post("/necessidades", { ...dados, quantidade: Number(dados.quantidade) });
      setMensagem(`Necessidade de ${dados.item} cadastrada com sucesso.`);
      form.reset();
    } catch (error) {
      setMensagem(getApiError(error, "Não foi possível cadastrar. Tente novamente."));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className={S.mainCadastro}>
      <section className={S.containerCadastro}>
        <div className={S.formulario}>
          <div className={S.titulo}>
            <h1>Cadastrar Necessidade</h1>

            <p>
              Preencha os dados abaixo para cadastrar uma nova necessidade.
            </p>
          </div>

          <form onSubmit={cadastrar}>
            <div className={S.campo}>
              <label htmlFor="item">
                Item <strong>*</strong>
              </label>

              <input
                type="text"
                id="item"
                name="item"
                placeholder="Ex: Água, Alimentos, Roupas..."
                required
              />
            </div>

            <div className={S.campo}>
              <label htmlFor="categoria">Categoria <strong>*</strong></label>
              <select id="categoria" name="categoria" required>
                <option value="">Selecione a categoria</option>
                <option value="Água">Água</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Roupas">Roupas</option>
                <option value="Higiene">Higiene</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className={S.campo}>
              <label htmlFor="local">
                Local / Instituição <strong>*</strong>
              </label>

              <input
                type="text"
                id="local"
                name="local"
                placeholder="Ex: Centro Comunitário, Escola Municipal..."
                required
              />
            </div>

            <div className={S.linhaCampos}>
              <div className={S.campo}>
                <label htmlFor="quantidade">
                  Quantidade <strong>*</strong>
                </label>

                <input
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  placeholder="Ex: 100"
                  min="1"
                  required
                />
              </div>

              <div className={S.campo}>
                <label htmlFor="unidade">Unidade</label>

                <select id="unidade" name="unidade">
                  <option value="">Ex: unidades, litros, kits...</option>
                  <option value="unidades">Unidades</option>
                  <option value="litros">Litros</option>
                  <option value="quilos">Quilos</option>
                  <option value="kits">Kits</option>
                  <option value="caixas">Caixas</option>
                  <option value="garrafas">Garrafas</option>
                </select>
              </div>
            </div>

            <div className={S.campo}>
              <label htmlFor="prioridade">
                Prioridade <strong>*</strong>
              </label>

              <select id="prioridade" name="prioridade" required>
                <option value="">Selecione a prioridade</option>
                <option value="urgente">Urgente</option>
                <option value="importante">Importante</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <button type="submit" className={S.btnCadastrar} disabled={enviando}>
              {enviando ? "Cadastrando..." : "Cadastrar Necessidade"}
            </button>
            <p className={S.feedback} role="status" aria-live="polite">{mensagem}</p>
          </form>
        </div>

        <div className={S.imagemCadastro}>
          <img
            src={cadastroImg}
            alt="Caixa de doações com uma lista de necessidades"
          />
        </div>
      </section>
    </main>
  );
}
