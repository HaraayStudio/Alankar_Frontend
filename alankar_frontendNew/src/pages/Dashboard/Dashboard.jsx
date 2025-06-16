import React ,{ useContext ,useState} from 'react'
import { DataContext } from '../../context/DataContext';
import styles from './Dashboard.module.scss';
import Profile from '../../components/Profile';
import accounts from '../../assets/accounts.svg';
export default function Dashboard() {
  const { orders , clients  } = useContext(DataContext);
  console.log(clients);
    const [selectedClient, setSelectedClient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const clientsData = clients;
   const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'CREATED': return '#ffa500';
      case 'IN_PROGRESS': return '#007bff';
      case 'COMPLETED': return '#28a745';
      case 'PENDING': return '#6c757d';
      default: return '#6c757d';
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#dc3545';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };
  const getTotalOrders = () => {
    // return clientsData.reduce((total, client) => total + client.orders.length, 0);
    return 0
  };
  const getCompletedOrders = () => {
    // return clientsData.reduce((total, client) => 
    //   total + client.orders.filter(order => order.status === 'COMPLETED').length, 0
    // );
    return 0
  };
  const graphdata = [
  { month: 'Jan', percent: 60, growth: 16 },
  { month: 'Feb', percent: 90, growth: 8 },
  { month: 'Mar', percent: 75, growth: 15 },
  { month: 'Apr', percent: 65, growth: 10 },
  { month: 'May', percent: 100 },
  { month: 'Jun', percent: 40 },
  { month: 'Jul', percent: 70 },
  { month: 'Aug', percent: 80 },
  { month: 'Sep', percent: 85 },
  { month: 'Oct', percent: 85 },
  { month: 'Nov', percent: 85 },
  { month: 'Dec', percent: 85 },
];
  return (
   <div className={styles.dashboardMain}>
    <div className={styles.sec1}>
      <div className={styles.leftCard}>
        <div className={styles.cardHeader}><svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
  <rect y="0.5" width="32" height="32" rx="16" fill="#B8D3FF"/>
  <path d="M24.0005 13.0005V23H8.00049V13.0005H13.0005V12.0006C13.0005 11.86 13.0265 11.7298 13.0786 11.61C13.1307 11.4902 13.201 11.386 13.2896 11.2975C13.3781 11.209 13.4849 11.1361 13.6099 11.0788C13.7349 11.0215 13.8651 10.9954 14.0005 11.0007H18.0005C18.1411 11.0007 18.2713 11.0267 18.3911 11.0788C18.5109 11.1309 18.6151 11.2012 18.7036 11.2897C18.7922 11.3782 18.8651 11.485 18.9224 11.61C18.9797 11.735 19.0057 11.8652 19.0005 12.0006V13.0005H24.0005ZM14.0005 13.0005H18.0005V12.0006H14.0005V13.0005ZM9.00049 14.0005V15.4457L14.0005 17.9378V17.0003H18.0005V17.9378L23.0005 15.4457V14.0005H9.00049ZM15.0005 18.0003V19.0002H17.0005V18.0003H15.0005ZM23.0005 22.0001V16.555L18.0005 19.0627V20.0002H14.0005V19.0627L9.00049 16.555V22.0001H23.0005Z" fill="#1D5B86"/>
</svg> <h2>Total Clients</h2> </div>
<div className={styles.content}>
  <div><h5>150</h5></div>
  <div><p>Total clients this month</p></div>
  <div> <Profile users={clients.map(client => ({ name: client.name }))} />
</div>
</div>
      </div>
 <div className={styles.rightCard}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
        {/* <div className={styles.selectBox}>
          Select <span>▼</span>
        </div> */}
      </div>
      <div className={styles.chart}>
        {graphdata.map((item, idx) => (
          <div key={idx} className={styles.barWrapper}>
            {/* {item.growth && (
              <div className={styles.growth}>↑ {item.growth}%</div>
            )} */}
            <div
              className={`${styles.bar} ${item.percent === 100 ? styles.active : ''}`}
              style={{ height: `${item.percent}%` }}
            >
              {item.percent === 100 && (
                <div className={styles.label}>100%</div>
              )}
            </div>
            <span className={styles.month}>{item.month}</span>
          </div>
        ))}
      </div>
    </div></div>   </div>
    <div className={styles.sec2}>
         <div className={styles.ordersContainer}>
      <div className={styles.ordersHeader}>
        <h2>All Ongoing Projects</h2>
        <div className={styles.ordersStats}>
          <span className={styles.statItem}>
            Total: {getTotalOrders()}
          </span>
          <span className={styles.statItem}>
            Completed: {getCompletedOrders()}
          </span>
        </div>
      </div>
      <div className={styles.ordersContent}>
        <div className={styles.clientsSidebar}>
          {clientsData.map(client => (
            <div 
              key={client.id}
              className={`${styles.clientItem} ${selectedClient?.id === client.id ? styles.active : ''}`}
              onClick={() => {
                setSelectedClient(client);
                setSelectedOrder(null);
              }}
            >
              <div className={styles.clientName}>{client.name} <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
  <rect width="42" height="42" rx="21" fill="#104264"/>
  <path d="M26.0069 16.4812L26.0069 16.0487L26.4387 16.0493L26.4394 16.4812L26.0069 16.4812ZM17.1501 25.9488C17.0691 26.0298 16.9592 26.0753 16.8447 26.0753C16.7301 26.0753 16.6202 26.0298 16.5392 25.9488C16.4582 25.8678 16.4127 25.758 16.4127 25.6434C16.4127 25.5289 16.4582 25.419 16.5392 25.338L17.1501 25.9488ZM18.6771 16.0487L26.0069 16.0487L26.0069 16.9136L18.6771 16.9136L18.6771 16.0487ZM26.4394 16.4812L26.4394 23.811L25.5744 23.811L25.5744 16.4812L26.4394 16.4812ZM26.3123 16.7866L17.1501 25.9488L16.5392 25.338L25.7015 16.1758L26.3123 16.7866Z" fill="white"/>
</svg></div>
              {/* <div className={styles.clientOrdersCount}>{client.orders.length} orders</div> */}
            </div>
          ))}
        </div>
        <div className={styles.ordersMain}>
          {selectedClient ? (
            <>
              <div className={styles.clientDetails}>
                <div className={styles.clientInfoHeader}>
                  <h3>{selectedClient.name}</h3>
                  <span className={styles.ordersCount}>{selectedClient.orders.length} Orders</span>
                </div>
                <div className={styles.clientContact}>
                  <div className={styles.contactItem}>
                    <label>E-mail address</label>
                    <div className={styles.contactValue}>{selectedClient.email}</div>
                  </div>
                  <div className={styles.contactItem}>
                    <label>Mobile number</label>
                    <div className={styles.contactValue}>+91 {selectedClient.phone}</div>
                  </div>
                  <div className={styles.contactItem}>
                    <label>Address</label>
                    <div className={styles.contactValue}>{selectedClient.address}</div>
                  </div>
                </div>
              </div>
              <div className={styles.ordersList}>
                <h4>Orders</h4>
                {selectedClient.orders.map(order => (
                  <div 
                    key={order.id}
                    className={`${styles.orderItem} ${selectedOrder?.id === order.id ? styles.active : ''}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className={styles.orderHeader}>
                      <div className={styles.orderType}>{order.type}</div>
                      <div className={styles.orderStatus}>
                        <span 
                          className={styles.statusIndicator}
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        ></span>
                        {order.status.replace('_', ' ')}
                      </div>
                    </div>
                    <div className={styles.orderDescription}>{order.description}</div>
                    <div className={styles.orderMeta}>
                      <span className={styles.orderDate}>Created: {formatDate(order.createdAt)}</span>
                      <span 
                        className={styles.orderPriority}
                        style={{ color: getPriorityColor(order.priority) }}
                      >
                        {order.priority} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noSelection}>
              <h3>Select a client to view orders</h3>
              <p>Choose a client from the sidebar to see their order details</p>
            </div>
          )}
        </div>
        {selectedOrder && (
          <div className={styles.orderDetails}>
            <div className={styles.orderDetailsHeader}>
              <h4>Order Details</h4>
              <button 
                className={styles.closeDetails}
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.orderInfo}>
              <div className={styles.infoRow}>
                <label>Order ID</label>
                <span>#{selectedOrder.id}</span>
              </div>
              <div className={styles.infoRow}>
                <label>Type</label>
                <span>{selectedOrder.type}</span>
              </div>
              <div className={styles.infoRow}>
                <label>Status</label>
                <span className={styles.statusBadge} style={{ backgroundColor: getStatusColor(selectedOrder.status) }}>
                  {selectedOrder.status.replace('_', ' ')}
                </span>
              </div>
              <div className={styles.infoRow}>
                <label>Priority</label>
                <span className={styles.priorityBadge} style={{ color: getPriorityColor(selectedOrder.priority) }}>
                  {selectedOrder.priority}
                </span>
              </div>
              <div className={styles.infoRow}>
                <label>Start Date</label>
                <span>{formatDate(selectedOrder.startDate)}</span>
              </div>
              <div className={styles.infoRow}>
                <label>End Date</label>
                <span>{formatDate(selectedOrder.endDate)}</span>
              </div>
            </div>
            <div className={styles.orderDescriptionFull}>
              <label>Description</label>
              <p>{selectedOrder.description}</p>
            </div>
            <div className={styles.orderSteps}>
              <label>Progress Steps</label>
              <div className={styles.stepsList}>
                {selectedOrder.steps.map((step, index) => (
                  <div key={step.id} className={styles.stepItem}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepName}>{step.name}</div>
                      <div 
                        className={styles.stepStatus}
                        style={{ color: getStatusColor(step.status) }}
                      >
                        {step.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    <div className={styles.sec3}>
      <img src={accounts} alt="" />
    </div>
   </div>
  )
}
