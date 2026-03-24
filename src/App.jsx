import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './App.css';

const months = [
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
];

const MAX_MONTHLY_DEPOSIT = 12500;
const formatCurrency = (value) => `Rs ${Number(value).toLocaleString('en-IN')}`;

function App() {
  const [startYear, setStartYear] = useState(2023);
  const [startMonth, setStartMonth] = useState('August');
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState(7.1);
  const [durationYears, setDurationYears] = useState(25);

  const schedule = useMemo(() => {
    const safeMonthlyDeposit = Math.min(Math.max(monthlyDeposit, 0), MAX_MONTHLY_DEPOSIT);
    const safeDurationYears = Math.max(0, Math.floor(durationYears));
    let currentBalance = 0;
    let totalInvestedAllTime = 0;
    const yearlyData = [];
    const startIndex = months.indexOf(startMonth);

    for (let year = 0; year < safeDurationYears; year += 1) {
      let yearlyInvested = 0;
      let yearlyInterest = 0;
      const currentFYStart = startYear + year;
      const currentFYEnd = currentFYStart + 1;
      const fyLabel = `FY ${currentFYStart}-${currentFYEnd.toString().slice(-2)}`;

      for (let monthIdx = 0; monthIdx < 12; monthIdx += 1) {
        if (year === 0 && monthIdx < startIndex) {
          continue;
        }

        yearlyInvested += safeMonthlyDeposit;
        currentBalance += safeMonthlyDeposit;
        totalInvestedAllTime += safeMonthlyDeposit;

        const monthlyInterest = currentBalance * (interestRate / 100) / 12;
        yearlyInterest += monthlyInterest;
      }

      currentBalance += yearlyInterest;

      yearlyData.push({
        fy: fyLabel,
        invested: yearlyInvested,
        interest: Math.round(yearlyInterest),
        closingBalance: Math.round(currentBalance),
      });
    }

    const finalBalance = Math.round(currentBalance);
    return {
      yearlyData,
      totalInvestedAllTime,
      totalInterestEarned: finalBalance - totalInvestedAllTime,
      finalBalance,
    };
  }, [startYear, startMonth, monthlyDeposit, interestRate, durationYears]);

  const chartData = useMemo(() => {
    let cumulativeInvested = 0;
    return schedule.yearlyData.map((row) => {
      cumulativeInvested += row.invested;
      return {
        fy: row.fy,
        invested: cumulativeInvested,
        balance: row.closingBalance,
      };
    });
  }, [schedule.yearlyData]);

  return (
    <div className="app">
      <header className="header">
        <h1>PPF Calculator</h1>
        <p>Interactive dashboard for projected PPF growth across financial years.</p>
      </header>

      <section className="controls card">
        <div className="field">
          <label>Monthly Deposit (Rs)</label>
          <input
            type="number"
            min="0"
            max={MAX_MONTHLY_DEPOSIT}
            value={monthlyDeposit}
            onChange={(e) =>
              setMonthlyDeposit(Math.min(Math.max(Number(e.target.value), 0), MAX_MONTHLY_DEPOSIT))
            }
          />
        </div>

        <div className="field">
          <label>Start Year</label>
          <input
            type="number"
            step="1"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Start Month</label>
          <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Duration (Years)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={durationYears}
            onChange={(e) => setDurationYears(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
      </section>

      <section className="summary-grid">
        <div className="card summary invested">
          <h4>Total Invested</h4>
          <p className="amount">
            Rs {schedule.totalInvestedAllTime.toLocaleString()}
          </p>
        </div>

        <div className="card summary interest">
          <h4>Total Interest Earned</h4>
          <p className="amount">
            Rs {schedule.totalInterestEarned.toLocaleString()}
          </p>
        </div>

        <div className="card summary wealth">
          <h4>Total Wealth Generated</h4>
          <p className="amount">
            Rs {schedule.finalBalance.toLocaleString()}
          </p>
        </div>
      </section>

      <section className="card chart-card">
        <h3>Growth Overview</h3>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
              <defs>
                <linearGradient id="investedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5a67d8" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#5a67d8" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="wealthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fy" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis
                width={120}
                tickMargin={8}
                allowDecimals={false}
                tickFormatter={formatCurrency}
              />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Area
                type="monotone"
                dataKey="invested"
                name="Total Invested"
                stroke="#5a67d8"
                fill="url(#investedFill)"
              />
              <Area
                type="monotone"
                dataKey="balance"
                name="Total Wealth"
                stroke="#16a34a"
                fill="url(#wealthFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card table-card">
        <h3>Yearly Breakdown</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Financial Year</th>
                <th>Deposited (Rs)</th>
                <th>Interest Earned (Rs)</th>
                <th>Closing Balance (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {schedule.yearlyData.map((row) => (
                <tr key={row.fy}>
                  <td>{row.fy}</td>
                  <td>{row.invested.toLocaleString()}</td>
                  <td>{row.interest.toLocaleString()}</td>
                  <td className="closing-balance">{row.closingBalance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
