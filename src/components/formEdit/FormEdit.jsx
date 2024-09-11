import React, { useState, useEffect } from "react";

const FormEdit = ({ item, onSave, onCancel }) => {
  // Inclui o ID no estado inicial
  const [formData, setFormData] = useState({
    id: item.id || "",            // Adiciona o ID ao estado inicial
    data: item.data || "",        // Inicializa como string vazia se undefined
    codigo: item.codigo || "",    // Inicializa como string vazia se undefined
    descricao: item.descricao || "", // Inicializa como string vazia se undefined
  });

  useEffect(() => {
    // Atualiza o estado quando o item é alterado
    setFormData({
      id: item.id || "",
      data: item.data || "",
      codigo: item.codigo || "",
      descricao: item.descricao || "",
    });
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Passa os dados atualizados para a função onSave
  };

  return (
    <div>
      <h3>Editando Tabulação: {formData.id}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Data
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
          />
        </label>
        <label>
          Código
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormEdit;
