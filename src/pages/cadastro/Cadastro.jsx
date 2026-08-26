import S from "./cadastro.module.scss";
import cadastroImg from "../../assets/img/cadastro.jpeg";
import { useState } from "react";

export default function Cadastro() {
  const [mensagem, setMensagem] = useState("");

  function cadastrar(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const item = new FormData(form).get("item");
    setMensagem(`Necessidade de ${item} cadastrada para demonstração.`);
    form.reset();
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

            <button type="submit" className={S.btnCadastrar}>
              Cadastrar Necessidade
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
