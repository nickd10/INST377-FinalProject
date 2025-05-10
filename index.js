const express = require('express');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
const supabaseUrl = 'https://ferjvmbmtfqyztixhyea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcmp2bWJtdGZxeXp0aXhoeWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTEwMDIsImV4cCI6MjA2MjM4NzAwMn0.q7l9DIy5kZ3WH6pn8D_DymcwRrNwN2uoRUZlWJ3x5h4';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});