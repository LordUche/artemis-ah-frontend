import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Template from '../components/Template';
import ProfileOptionCard from '../components/ProfileOptionCard';
import { readingStatsIcon } from '../assets/img__func/icons_svg';

/**
 * @class ReadingStatsPage
 */
class ReadingStatsPage extends Component {
  state = {
    activeTab: 'time_spent',
    timeSpentData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    },
    numArticlesReadData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    }
  };

  /**
   * @description React lifecyle method
   * @returns {undefined}
   */
  componentDidMount() {
    // Pass
  }

  /**
   * @param {*} activeTab The tab to switch to
   * @returns {undefined}
   */
  toggleActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  /**
   * @returns {Node} Returns the reading stats page.
   */
  render() {
    const { timeSpentData, numArticlesReadData, activeTab } = this.state;

    return (
      <Template>
        <ProfileOptionCard headerText="Reading Stats" headerImg={readingStatsIcon(40, 40)}>
          <section className="settings_section reading-stats">
            <nav className="settings_section_nav">
              <ul className="settings_section_nav_list">
                <li className={activeTab === 'time_spent' ? 'active' : ''} id="Notifications" onClick={() => this.toggleActiveTab('time_spent')} role="presentation">
                  Time Spent
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                </li>
                <li className={activeTab === 'articles_read' ? 'active' : ''} id="Password" onClick={() => this.toggleActiveTab('articles_read')} role="presentation">
                  Articles Read
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                </li>
              </ul>
            </nav>
            <section className="settings_section_body">
              {activeTab === 'time_spent' && (
                <div>
                  <div className="top">
                    <div className="header">Time spent reading</div>
                    <div className="stat">
                      <div>
                        <span className="number">0</span>
                        {' '}
                        min
                      </div>
                      <div className="label">This Month</div>
                    </div>
                    <div className="stat">
                      <div>
                        <span className="number">0</span>
                        {' '}
                        min
                      </div>
                      <div className="label">Today</div>
                    </div>
                  </div>
                  <div className="chart-container">
                    <Line data={timeSpentData} />
                  </div>
                  <div className="chart-option">
                    <select>
                      <option>This Month</option>
                      <option>This Week</option>
                    </select>
                  </div>
                </div>
              )}
              {activeTab === 'articles_read' && (
                <div>
                  <div className="top">
                    <div className="header">Number of Articles Read</div>
                    <div className="stat">
                      <div>
                        <span className="number">0</span>
                      </div>
                      <div className="label">This Month</div>
                    </div>
                    <div className="stat">
                      <div>
                        <span className="number">0</span>
                      </div>
                      <div className="label">Today</div>
                    </div>
                  </div>
                  <div className="chart-container">
                    <Line data={numArticlesReadData} />
                  </div>
                  <div className="chart-option">
                    <select>
                      <option>This Month</option>
                      <option>This Week</option>
                    </select>
                  </div>
                </div>
              )}
            </section>
          </section>
        </ProfileOptionCard>
      </Template>
    );
  }
}

/**
 * @param {*} state The redux state
 * @returns {object} The props
 */
const state2props = state => ({ state });

export default connect(state2props)(ReadingStatsPage);
