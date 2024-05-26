import "../common/commonStyle/Common.css"
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    ArrowRightOutlined,
    PaperClipOutlined,
    CalendarFilled,
    UnorderedListOutlined,
  } from '@ant-design/icons';
const { Sider, Content } = Layout;
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Modals from '../common/modal/Modal'
import WebTemplate from "../common/template/Webtemplate";
import { connect} from 'react-redux';
import Cookie from 'js-cookie'
import {  btnText } from '../Text/titles/Module';
import { 
  getUser, 
  todayTasks, 
  delayTasks, 
  upCommingTasks, 
  deleteTask } from '../action/GetTask'
import { 
   setTaskName, 
   setTaskDescription, 
   setTaskDate, 
   setNewTaskName, 
   setNewTaskDescription, 
   setNewDate, editTask } from "../action/addTask";
import { addTask } from "../action/addTask"; 
const Home = (props) => {
    const dispatch = useDispatch()
    const {
           task_name, 
           task_description, 
           task_date, 
           new_task_name, 
           new_task_description, 
           new_date, 
           setTaskName, 
           setTaskDescription, 
           setTaskDate, 
           setNewTaskName, 
           setNewTaskDescription, 
           setNewDate,
           rejected
          } = props

    const [collapsed, setCollapsed] = useState(true); 
    const [modalOpen, setModalOpen] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)

    const [showPage, setShowPage] = useState('Today Tasks')  
    const name = useSelector((state) => state.userData.userName)
    const [itemSources, setItemSources] = useState();
    const todaytask = useSelector((state) => state.userData.tTasks);
    const delayTask = useSelector((state) => state.userData.delay);
    const upcommingTask = useSelector((state) => state.userData.upComming);
    const stickyWall = useSelector((state) => state.userData.stickyWall);
    const getToken = Cookie.get('ID')


    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };
      const handleModalOpen = () => {
        setModalOpen(true);
      };
    
      const handleModalClose = () => {
        setModalOpen(false);
      };

      useEffect(() => {
        setShowSpinner(true)
          setTimeout(() => {
            setShowSpinner(false);
        }, 1000); 
      }, [])
      
    const handleAddTask = async () => { 
      setShowSpinner(true);
      try {
          await dispatch(addTask({ 
            task_name, 
            task_description, 
            task_date}));
      } catch(error) {
          throw error
      } finally {
          setTimeout(() => {
              setShowSpinner(false);
          }, 1000); 
      }
    };

    const handleDeleteTask = async(id) => {
      setShowSpinner(true);
      try {
          await dispatch(deleteTask(id));
      } catch(error) {
          throw error
      } finally {
        setTimeout(() => {
          setShowSpinner(false);
      }, 1000); 
      }
    }

    useEffect(() => {
      dispatch(getUser(getToken))
      dispatch(todayTasks(getToken))
      dispatch(delayTasks(getToken))
      dispatch(upCommingTasks(getToken))
    }, [getToken, todayTasks, showSpinner, showPage])

    useEffect(() => {
      let selectedTasks = [];
      if (showPage === 'Today Tasks') {
        selectedTasks = todaytask;
      } else if (showPage === 'Upcomming Tasks') {
        selectedTasks = upcommingTask;
      } else if (showPage === 'Delay Tasks') {
        selectedTasks = delayTask;
      }
      setItemSources(selectedTasks);
    }, [showPage, todaytask, upcommingTask, delayTask]);

    const handleMenuPage = (page) => {
      return setShowPage(page);
    }

    const handleEditTask = (res) => {
      dispatch(setNewTaskName(res))
    }

    const handleEditDescription = (res) => {
      dispatch(setNewTaskDescription(res))
    }

    const handleEditDate = (date) => {
      dispatch(setNewDate(date))
    }

    const handleEditedTask = (id) => {
      setShowSpinner(true);
      try {
        dispatch(editTask({
          date: new_date, 
          description: new_task_description, 
          task_name: new_task_name, 
          task_id: id}))
      } catch (error) {

      } finally {
        setTimeout(() => {
          setShowSpinner(false);
      }, 1000); 
      }
  
    }

    const handleLogout = () => {
      setShowSpinner(true);
      try {
        Cookie.remove('ID');
        Cookie.remove('token');
      } catch(error) {
        throw error
      } finally {
        setTimeout(() => {
          setShowSpinner(false);
          
      }, 1000); 
      }
     
    }


    return (
        <>

            <Modals 
             open={modalOpen} 
             handleClose={handleModalClose}
             task_name={task_name}
             task_description={task_description}
             task_date={task_date}
             setTaskName={setTaskName}
             setTaskDescription={setTaskDescription}
             setTaskDate={setTaskDate}
             handleAddTask={handleAddTask}
             showSpinner={showSpinner}
             rejected={rejected}
            />

            <Layout 
              style={
                 { minHeight: '100vh', 
                   background: '#fff' }
              }
            >

              <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={toggleCollapsed} 
                style={
                    { background: '#F5F5F5', 
                      borderRight: '1px solid rgba(0,0,0,0.2)', 
                      position: 'sticky', top: 0, height: '100vh' 
                    }
                  }
              >
              
              <div 
               className="logo" 
               style={{ background: '#F5F5F5'}}  
              />
                
              <div>
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: collapsed ? 'center' : 'flex-end', 
                      alignItems: 'center', 
                      padding: '8px', 
                      cursor: 'pointer', 
                      color: 'black' 
                    }} 
                    onClick={toggleCollapsed}
                  >
                  {collapsed ? '☰' : '✖'}
                </div>
              </div>

                <Menu 
                   theme="light" 
                   defaultSelectedKeys={['1']} 
                   mode="inline" 
                   style={{ background: '#F5F5F5', color: '#000', border: 'none' }}
                >
                
                  <Menu.Item 
                    key="0" 
                    icon={<UserOutlined />}
                  >
                    {name && name.name}
                  </Menu.Item>

                  <Menu.Item 
                    key="1" 
                    icon={<UnorderedListOutlined />} 
                    onClick={() => {
                      handleMenuPage("Today Tasks")
                    }}
                  >
                    Today
                  </Menu.Item>

                  <Menu.Item 
                    key="2" 
                    icon={<ArrowRightOutlined />} 
                    onClick={() => {
                      handleMenuPage("Upcomming Tasks")
                    }}
                  >
                    Upcoming
                  </Menu.Item> 

                  <Menu.Item 
                    key="3" 
                    icon={<CalendarFilled />} 
                    onClick={() => handleMenuPage("Delay Tasks")}
                  >
                    Delayed Tasks
                  </Menu.Item> 

                  <hr/> 

                  <Menu.Item 
                    key="10" 
                    icon={<LogoutOutlined />}  
                    onClick={handleLogout}
                  >
                    Sign out
                  </Menu.Item>

                </Menu>

            </Sider>

      
            <Layout 
              className="site-layout" 
              style={{background: 'white'}}
            >

                <Content 
                  style={{ margin: '16px' }}
                >

                  <div 
                    style={{ padding: 24, minHeight: 360, background: 'white' }}
                  >
                  
      
                  <WebTemplate
                    showPage={showPage}
                    addTask={btnText.addTask}
                    setEditTask={handleEditTask}
                    setEditDescription={handleEditDescription}
                    editDateVal={new_date}
                    setEditDate={handleEditDate}
                    itemSources={itemSources}
                    showModal={handleModalOpen}
                    handleDeleteTask={handleDeleteTask}
                    handleEditedTask={handleEditedTask}
                  />

                  </div>

                </Content>

            </Layout>

          </Layout>

        </>
    )
}

const mapStateToProps = (state) => ({
  task_name: state.userTask.task_name,
  task_description: state.userTask.task_description,
  task_date: state.userTask.task_date,
  new_task_name: state.userTask.new_task_name,
  new_task_description: state.userTask.new_task_description,
  new_date: state.userTask.new_date,
  rejected: state.userTask.rejected
});

const mapDispatchToProps = {
  setTaskName,
  setTaskDescription,
  setTaskDate,
  setNewTaskName,
  setNewTaskDescription,
  setNewDate
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
