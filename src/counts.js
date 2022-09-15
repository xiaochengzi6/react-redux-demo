import { useEffect, useContext } from 'react'
import { connect } from './react-redux'
import { Increase, Decrease } from './reducer'
import TestContext from './TestContext'
import SubCounter from './SubCount'
function Count(props) {
  const { getCount, setDecrease, setIncrease } = props
  const context = useContext(TestContext)

  useEffect(() => {
    console.log(getCount)
  })

  return (
    <div>
      <div style={{ color: context.color }}>{getCount}</div>
      <button onClick={setIncrease}>+1</button>
      <button onClick={setDecrease}>-1</button>
      <SubCounter></SubCounter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    getCount: state.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIncrease() {
      return dispatch(Increase(1))
    },
    setDecrease() {
      return dispatch(Decrease(-1))
    },
  }
}

Count = connect(mapStateToProps, mapDispatchToProps)(Count)

export default Count
