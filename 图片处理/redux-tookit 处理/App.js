import { increment, decrement, reset, incrementTo2, decrementTo4 } from './store/reducer'
import { useDispatch, useSelector } from 'react-redux'
export default function App() {
    const count = useSelector((state) => state.count.value)
    const dispatch = useDispatch()
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement())}>-1</button>
            <button onClick={() => dispatch(incrementTo2(2))}>+2</button>
            <button onClick={() => dispatch(decrementTo4(4))}>-4</button>
            <button onClick={() => dispatch(reset())}>重置</button>
        </div>
    )
}
