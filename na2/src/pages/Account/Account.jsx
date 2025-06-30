import React, { useContext } from 'react';
import styles from './Dashboard.module.scss';
import { DataContext } from '../../context/DataContext';
import WeeklySalesChart  from "./charts/WeeklySalesChart.jsx"
import InvesteesChart  from "./charts/InvesteesChart.jsx"
import ClientActivityChart  from "./charts/ClientActivityChart.jsx"
import MonthlyExpensesChart  from "./charts/MonthlyExpensesChart.jsx"
import ClientsStats  from "./charts/ClientsStats.jsx"
import IncomeCard from "./charts/IncomeCard.jsx"
import PaymentHistory  from "./charts/PaymentHistory.jsx"
import ExpensesCard  from "./charts/ExpensesCard.jsx"
import PaymentDues  from "./charts/PaymentDues.jsx"

const Dashboard = () => {
  const { orders, invoices, clients } = useContext(DataContext);

  // Sample data processing
  const weeklySalesData = [
    { day: 'Mon', sales: 2000 },
    { day: 'Tue', sales: 4200 },
    { day: 'Wed', sales: 3500 },
    { day: 'Thu', sales: 5800 },
    { day: 'Fri', sales: 4100 },
    { day: 'Sat', sales: 6300 },
    { day: 'Sun', sales: 4900 }
  ];

  const clientActivityData = [
    { month: 'Mar', clients: 250 },
    { month: 'Apr', clients: 420 },
    { month: 'May', clients: 380 },
    { month: 'Jun', clients: 550 },
    { month: 'Jul', clients: 600 },
    { month: 'Aug', clients: 750 }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Payments summary</h1>
      </div>

      <div className={styles.grid}>
        {/* Row 1 - Summary Card */}
        

        {/* Row 2 - Weekly Sales */}
        <div className={`${styles.card} ${styles.sales}`}>
          <WeeklySalesChart data={weeklySalesData} />
        </div>

        {/* Row 3 - Clients Stats */}
        <div className={`${styles.card} ${styles.clients}`}>
          <ClientsStats 
            totalClients={clients.length} 
            activeClients={clients.filter(c => c.status === 'ACTIVE').length} 
          />
        </div>

        {/* Row 4 - Income Card */}
        <div className={`${styles.card} ${styles.income}`}>
          <IncomeCard 
            amount="$5,000" 
            change="1.10%" 
            extra="$2,500" 
          />
        </div>

        {/* Row 5 - Payment History */}
        <div className={`${styles.card} ${styles.paymentHistory}`}>
          <PaymentHistory invoices={invoices.slice(0, 2)} />
        </div>

        {/* Row 6 - Investees Chart */}
        <div className={`${styles.card} ${styles.investees}`}>
          <InvesteesChart data={weeklySalesData} />
        </div>

        {/* Row 7 - Client Activity */}
        <div className={`${styles.card} ${styles.clientActivity}`}>
          <ClientActivityChart data={clientActivityData} />
        </div>

        {/* Row 8 - Expenses */}
        <div className={`${styles.card} ${styles.expenses}`}>
          <ExpensesCard 
            amount="$5,000" 
            change="↑10%" 
            extra="$2,500" 
          />
        </div>

        {/* Row 9 - Monthly Expenses */}
        <div className={`${styles.card} ${styles.monthlyExpenses}`}>
          <MonthlyExpensesChart data={clientActivityData} />
        </div>

        {/* Row 10 - Payment Dues */}
        <div className={`${styles.card} ${styles.paymentDues}`}>
          <PaymentDues invoices={invoices.filter(i => i.payments.some(p => p.status === 'PENDING'))} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;