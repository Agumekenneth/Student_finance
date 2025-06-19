const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Savings = require('../models/savings');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch transactions
    const transactions = await Transaction.findByUserId(userId);
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Fetch budgets
    const budgets = await Budget.findByUserId(userId);

    // Fetch savings
    const savings = await Savings.findByUserId(userId);
    const totalSavings = savings.reduce((sum, s) => sum + parseFloat(s.total_amount), 0);
    const savingsProgress = savings.map(s => ({
      account_name: s.account_name,
      progress: s.target_amount ? (parseFloat(s.total_amount) / parseFloat(s.target_amount) * 100) : 0
    }));

    // Prepare dashboard data
    const dashboardData = {
      totalIncome: Number(totalIncome.toFixed(2)),
      totalExpenses: Number(totalExpenses.toFixed(2)),
      netBalance: Number((totalIncome - totalExpenses).toFixed(2)),
      budgets,
      totalSavings: Number(totalSavings.toFixed(2)),
      savingsProgress
    };

    res.json(dashboardData);
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};
