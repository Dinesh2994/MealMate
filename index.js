const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/meals', (req, res) => {
  res.json([{ id: 1, name: 'Pasta' }, { id: 2, name: 'Salad' }]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
