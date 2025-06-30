import React, { useState, createContext, useContext } from 'react';
import { MoreHorizontal, Calendar, DollarSign, Clock, Users, TrendingUp, CheckCircle, AlertCircle, Pause, Play } from 'lucide-react';
// Mock DataContext for demonstration - replace with your actual context
import { DataContext } from '../../context/DataContext';
import styles from './Projects.module.scss'; // Assuming you have a CSS module for styles
// Dashboard Componen
 const Dashboard = () => {
  const { setAuthToken, authToken, orders } = useContext(DataContext);
  // Fix: orders is already an array, don't wrap it in useState
  console.log("Orders in Dashboard:", orders);
  const projects = orders ;
  // Calculate stats with null checks
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'IN_PROGRESS').length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return '#10B981';
      case 'IN_PROGRESS': return '#3B82F6';
      case 'ON_HOLD': return '#F59E0B';
      case 'CREATED': return '#6B7280';
      default: return '#6B7280';
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle size={16} />;
      case 'IN_PROGRESS': return <Play size={16} />;
      case 'ON_HOLD': return <Pause size={16} />;
      case 'CREATED': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#EF4444';
      case 'MEDIUM': return '#F59E0B';
      case 'LOW': return '#10B981';
      default: return '#6B7280';
    }
  };
  const getProgressPercentage = (steps) => {
    if (!steps || steps.length === 0) return 0;
    const completedSteps = steps.filter(step => step.status === 'COMPLETED').length;
    return Math.round((completedSteps / steps.length) * 100);
  };
  // Monthly data for chart
  const monthlyData = [
    { month: 'Jan', completed: 8, active: 12 },
    { month: 'Feb', completed: 12, active: 15 },
    { month: 'Mar', completed: 15, active: 18 },
    { month: 'Apr', completed: 10, active: 14 },
    { month: 'May', completed: 18, active: 20 },
    { month: 'Jun', completed: 14, active: 16 }
  ];
  return (
    // <div style={{ 
    //   minHeight: '100vh',  background: 'linear-gradient(89deg, #D7B3FF -39.46%, #C5DCFF 103.31%)',
    //   // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //   padding: '20px',
    //   fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    // }}>
    //   {/* Header */}
    //   <div style={{
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     marginBottom: '30px'
    //   }}>
    //     <div style={{
    //       display: 'flex',
    //       gap: '15px'
    //     }}>
    //       <button style={{
    //         background: 'rgba(255, 255, 255, 0.2)',
    //         border: 'none',
    //         padding: '12px 24px',
    //         borderRadius: '12px',
    //         color: 'white',
    //         fontWeight: '500',
    //         cursor: 'pointer',
    //         backdropFilter: 'blur(10px)'
    //       }}>
    //         Add New Project
    //       </button>
    //       <button style={{
    //         background: 'rgba(255, 255, 255, 0.1)',
    //         border: 'none',
    //         padding: '12px 24px',
    //         borderRadius: '12px',
    //         color: 'white',
    //         fontWeight: '500',
    //         cursor: 'pointer',
    //         backdropFilter: 'blur(10px)'
    //       }}>
    //         Ongoing Projects
    //       </button>
    //       <button style={{
    //         background: 'rgba(255, 255, 255, 0.1)',
    //         border: 'none',
    //         padding: '12px 24px',
    //         borderRadius: '12px',
    //         color: 'white',
    //         fontWeight: '500',
    //         cursor: 'pointer',
    //         backdropFilter: 'blur(10px)'
    //       }}>
    //         History & Details
    //       </button>
    //     </div>
    //   </div>
    //   {/* Main Content */}
    //   <div style={{
    //     background: 'rgba(255, 255, 255, 0.95)',
    //     borderRadius: '20px',
    //     padding: '30px',
    //     backdropFilter: 'blur(20px)',
    //     boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    //   }}>
    //     {/* Stats Cards */}
    //     <div style={{
    //       display: 'grid',
    //       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    //       gap: '20px',
    //       marginBottom: '40px'
    //     }}>
    //       <div style={{
    //         background: 'white',
    //         padding: '25px',
    //         borderRadius: '16px',
    //         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    //         border: '1px solid rgba(0, 0, 0, 0.05)'
    //       }}>
    //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    //           <div style={{
    //             background: '#3B82F6',
    //             padding: '8px',
    //             borderRadius: '8px',
    //             color: 'white',
    //             display: 'flex'
    //           }}>
    //             <Users size={20} />
    //           </div>
    //           <span style={{ color: '#6B7280', fontSize: '14px' }}>Active Projects</span>
    //         </div>
    //         <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{activeProjects}</div>
    //       </div>
    //       <div style={{
    //         background: 'white',
    //         padding: '25px',
    //         borderRadius: '16px',
    //         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    //         border: '1px solid rgba(0, 0, 0, 0.05)'
    //       }}>
    //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    //           <div style={{
    //             background: '#10B981',
    //             padding: '8px',
    //             borderRadius: '8px',
    //             color: 'white',
    //             display: 'flex'
    //           }}>
    //             <CheckCircle size={20} />
    //           </div>
    //           <span style={{ color: '#6B7280', fontSize: '14px' }}>Total Revenue</span>
    //         </div>
    //         <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>
    //           ₹{totalBudget > 0 ? (totalBudget / 1000).toFixed(0) : '0'}k
    //         </div>
    //       </div>
    //       <div style={{
    //         background: 'white',
    //         padding: '25px',
    //         borderRadius: '16px',
    //         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    //         border: '1px solid rgba(0, 0, 0, 0.05)'
    //       }}>
    //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    //           <div style={{
    //             background: '#F59E0B',
    //             padding: '8px',
    //             borderRadius: '8px',
    //             color: 'white',
    //             display: 'flex'
    //           }}>
    //             <Clock size={20} />
    //           </div>
    //           <span style={{ color: '#6B7280', fontSize: '14px' }}>Total Time</span>
    //         </div>
    //         <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>180h 40m</div>
    //       </div>
    //     </div>
    //     {/* Projects Overview & Chart */}
    //     <div style={{
    //       display: 'grid',
    //       gridTemplateColumns: '1fr 2fr',
    //       gap: '30px',
    //       marginBottom: '40px'
    //     }}>
    //       {/* Projects Overview */}
    //       <div>
    //         <h3 style={{ 
    //           fontSize: '18px', 
    //           fontWeight: '600', 
    //           color: '#1F2937', 
    //           marginBottom: '20px' 
    //         }}>
    //           Projects Overview
    //         </h3>
    //         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    //           <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             padding: '15px',
    //             background: '#F8FAFC',
    //             borderRadius: '12px'
    //           }}>
    //             <span style={{ color: '#64748B' }}>Active</span>
    //             <span style={{ fontWeight: '600', color: '#1F2937' }}>{activeProjects}</span>
    //           </div>
    //           <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             padding: '15px',
    //             background: '#F8FAFC',
    //             borderRadius: '12px'
    //           }}>
    //             <span style={{ color: '#64748B' }}>Total</span>
    //             <span style={{ fontWeight: '600', color: '#1F2937' }}>{totalProjects}</span>
    //           </div>
    //           <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             padding: '15px',
    //             background: '#F8FAFC',
    //             borderRadius: '12px'
    //           }}>
    //             <span style={{ color: '#64748B' }}>Budget</span>
    //             <span style={{ fontWeight: '600', color: '#1F2937' }}>
    //               ₹{totalBudget > 0 ? (totalBudget / 1000).toFixed(0) : '0'}k
    //             </span>
    //           </div>
    //           <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             padding: '15px',
    //             background: '#F8FAFC',
    //             borderRadius: '12px'
    //           }}>
    //             <span style={{ color: '#64748B' }}>Completed</span>
    //             <span style={{ fontWeight: '600', color: '#10B981' }}>{completedProjects}</span>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Chart */}
    //       <div>
    //         <div style={{
    //           background: 'white',
    //           padding: '25px',
    //           borderRadius: '16px',
    //           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    //           height: '300px'
    //         }}>
    //           <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             marginBottom: '20px'
    //           }}>
    //             <span style={{ fontWeight: '600', color: '#1F2937' }}>Monthly Progress</span>
    //             <div style={{ display: 'flex', gap: '20px', fontSize: '12px' }}>
    //               <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    //                 <div style={{ width: '12px', height: '12px', background: '#3B82F6', borderRadius: '2px' }}></div>
    //                 <span>Completed</span>
    //               </div>
    //               <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    //                 <div style={{ width: '12px', height: '12px', background: '#10B981', borderRadius: '2px' }}></div>
    //                 <span>Active Projects</span>
    //               </div>
    //             </div>
    //           </div>
    //           <div style={{
    //             display: 'flex',
    //             alignItems: 'end',
    //             justifyContent: 'space-between',
    //             height: '200px',
    //             padding: '0 10px'
    //           }}>
    //             {monthlyData.map((data, index) => (
    //               <div key={index} style={{
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 gap: '8px'
    //               }}>
    //                 <div style={{
    //                   display: 'flex',
    //                   flexDirection: 'column',
    //                   alignItems: 'center',
    //                   gap: '2px'
    //                 }}>
    //                   <div style={{
    //                     width: '20px',
    //                     height: `${data.completed * 8}px`,
    //                     background: '#3B82F6',
    //                     borderRadius: '3px 3px 0 0'
    //                   }}></div>
    //                   <div style={{
    //                     width: '20px',
    //                     height: `${data.active * 6}px`,
    //                     background: '#10B981',
    //                     borderRadius: '0 0 3px 3px'
    //                   }}></div>
    //                 </div>
    //                 <span style={{ fontSize: '12px', color: '#6B7280' }}>{data.month}</span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* Active Projects and All Projects Table */}
    //     <div style={{
    //       display: 'grid',
    //       gridTemplateColumns: '1fr 2fr',
    //       gap: '30px'
    //     }}>
    //       {/* Active Projects */}
    //       <div>
    //         <h3 style={{ 
    //           fontSize: '18px', 
    //           fontWeight: '600', 
    //           color: '#1F2937', 
    //           marginBottom: '20px' 
    //         }}>
    //           Active Projects
    //         </h3>
    //         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    //           {projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'CREATED').map((project) => (
    //             <div key={project.id} style={{
    //               background: 'white',
    //               padding: '15px',
    //               borderRadius: '12px',
    //               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    //               border: '1px solid rgba(0, 0, 0, 0.05)'
    //             }}>
    //               <div style={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 gap: '10px',
    //                 marginBottom: '8px'
    //               }}>
    //                 <div style={{
    //                   width: '8px',
    //                   height: '8px',
    //                   borderRadius: '50%',
    //                   background: getStatusColor(project.status)
    //                 }}></div>
    //                 <span style={{ fontWeight: '500', color: '#1F2937', fontSize: '14px' }}>
    //                   {project.type || 'Unknown Project'}
    //                 </span>
    //                 <span style={{
    //                   background: getPriorityColor(project.priority),
    //                   color: 'white',
    //                   padding: '2px 6px',
    //                   borderRadius: '4px',
    //                   fontSize: '10px',
    //                   fontWeight: '500'
    //                 }}>
    //                   {project.priority || 'MEDIUM'}
    //                 </span>
    //               </div>
    //               <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
    //                 {project.client?.name || 'No Client'}
    //               </div>
    //               <div style={{
    //                 display: 'flex',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center'
    //               }}>
    //                 <span style={{ fontSize: '12px', color: '#6B7280' }}>
    //                   {getProgressPercentage(project.steps)}% Complete
    //                 </span>
    //                 <div style={{
    //                   width: '60px',
    //                   height: '4px',
    //                   background: '#F3F4F6',
    //                   borderRadius: '2px',
    //                   overflow: 'hidden'
    //                 }}>
    //                   <div style={{
    //                     width: `${getProgressPercentage(project.steps)}%`,
    //                     height: '100%',
    //                     background: getStatusColor(project.status),
    //                     borderRadius: '2px'
    //                   }}></div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       {/* All Projects Table */}
    //       <div>
    //         <div style={{
    //           display: 'flex',
    //           justifyContent: 'space-between',
    //           alignItems: 'center',
    //           marginBottom: '20px'
    //         }}>
    //           <h3 style={{ 
    //             fontSize: '18px', 
    //             fontWeight: '600', 
    //             color: '#1F2937' 
    //           }}>
    //             All Project Table
    //           </h3>
    //           <MoreHorizontal size={20} color="#6B7280" style={{ cursor: 'pointer' }} />
    //         </div>
    //         <div style={{
    //           background: 'white',
    //           borderRadius: '12px',
    //           overflow: 'hidden',
    //           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    //         }}>
    //           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //             <thead>
    //               <tr style={{ background: '#F8FAFC' }}>
    //                 <th style={{
    //                   padding: '15px',
    //                   textAlign: 'left',
    //                   fontWeight: '500',
    //                   fontSize: '14px',
    //                   color: '#6B7280'
    //                 }}>
    //                   Project Name
    //                 </th>
    //                 <th style={{
    //                   padding: '15px',
    //                   textAlign: 'left',
    //                   fontWeight: '500',
    //                   fontSize: '14px',
    //                   color: '#6B7280'
    //                 }}>
    //                   Client Name
    //                 </th>
    //                 <th style={{
    //                   padding: '15px',
    //                   textAlign: 'left',
    //                   fontWeight: '500',
    //                   fontSize: '14px',
    //                   color: '#6B7280'
    //                 }}>
    //                   Assigned to
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {projects.map((project) => (
    //                 <tr key={project.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
    //                   <td style={{ padding: '15px' }}>
    //                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    //                       <div style={{
    //                         color: getStatusColor(project.status),
    //                         display: 'flex'
    //                       }}>
    //                         {getStatusIcon(project.status)}
    //                       </div>
    //                       <div>
    //                         <div style={{ fontWeight: '500', color: '#1F2937', fontSize: '14px' }}>
    //                           {project.type || 'Unknown Project'}
    //                         </div>
    //                         <div style={{ fontSize: '12px', color: '#6B7280' }}>
    //                           {getProgressPercentage(project.steps)}% Complete
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </td>
    //                   <td style={{ padding: '15px' }}>
    //                     <div style={{ fontWeight: '500', color: '#1F2937', fontSize: '14px' }}>
    //                       {project.client?.name || 'No Client'}
    //                     </div>
    //                     <div style={{ fontSize: '12px', color: '#6B7280' }}>
    //                       {project.client?.email || 'No Email'}
    //                     </div>
    //                   </td>
    //                   <td style={{ padding: '15px' }}>
    //                     <span style={{
    //                       background: '#F3F4F6',
    //                       color: '#6B7280',
    //                       padding: '4px 8px',
    //                       borderRadius: '6px',
    //                       fontSize: '12px'
    //                     }}>
    //                       Team Lead
    //                     </span>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={styles.mainProject}>
       <div className={styles.header}>
   <div className={styles.btnCard}>
     <button>Add New Project</button>
     <button>Ongoing Projects </button>
   <button>History & Details </button>
  </div>
 </div>
    </div>
  );
};
export default Dashboard;