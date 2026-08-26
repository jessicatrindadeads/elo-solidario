INSERT INTO necessidades (id, item, categoria, local, quantidade, unidade, prioridade)
VALUES
  ('00000000-0000-4000-8000-000000000001', 'Água Potável', 'Água', 'Centro Comunitário', 100, 'garrafas', 'urgente'),
  ('00000000-0000-4000-8000-000000000002', 'Alimentos Não Perecíveis', 'Alimentos', 'Escola Municipal', 50, 'unidades', 'urgente'),
  ('00000000-0000-4000-8000-000000000003', 'Roupas', 'Roupas', 'Abrigo São José', 30, 'conjuntos', 'importante'),
  ('00000000-0000-4000-8000-000000000004', 'Produtos de Higiene', 'Higiene', 'Centro de Apoio', 80, 'kits', 'normal')
ON CONFLICT (id) DO NOTHING;
