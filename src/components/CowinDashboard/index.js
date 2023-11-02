// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: 'initial', storedData: {}}

  componentDidMount() {
    this.renderGetVaccinationData()
  }

  renderGetVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    // console.log(data)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDayData => ({
          vaccineDate: eachDayData.vaccine_date,
          dose1: eachDayData.dose_1,
          dose2: eachDayData.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eachAgeData => ({
          age: eachAgeData.age,
          count: eachAgeData.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachGenderData => ({
          count: eachGenderData.count,
          gender: eachGenderData.gender,
        })),
      }
      this.setState({
        storedData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderVaccinationListView = () => {
    const {storedData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={storedData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationGenderDetails={storedData.vaccinationByGender}
        />
        <VaccinationByAge vaccinationAgeDetails={storedData.vaccinationByAge} />
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderVaccinationDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderVaccinationListView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-cont">
          <div className="logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-img"
            />
            <h1 className="logo-name">Co-Win</h1>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderVaccinationDetails()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
