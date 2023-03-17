import { useState, useCallback } from 'react';
import Button from './components/Button';
import ShowCount from './components/ShowCount';
import Title from './components/Title';
import { UseReducerSimple } from "./UseReducerSimple"
import { useInput } from './useInput';
import { useFetch } from './useFetch';
import AddComments from './components/AddComments';



function App() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const { loading, data: fakeData, error } = useFetch("https://jsonplaceholder.typicode.com/users")

    const incrementByOne = useCallback(() => {
        setCount1((prevCount) => prevCount + 1);
    }, []);

    const incrementByFive = useCallback(() => {
        setCount2((prevCount) => prevCount + 5);
    }, []);

    const isEvenOrOdd = () => {
        let i = 0;
        while (i < 1000000000) i += 1; // costly operation
        return count1 % 2 === 0;
    };


    const [titleProps, resetTitle] = useInput("");
    const [colorProps, resetColor] = useInput("#000000");


    const submit = (e) => {
      e.preventDefault();

      alert(
        `${titleProps.value}, ${colorProps.value}`
      );
      resetTitle();
      resetColor();
    };

    if(titleProps.value.length < 3) {
        console.log("color title field can not be empty!")
        // return
    } else {
        console.log("Good to go!")
    }

    if(loading) return <h1>Loading...</h1>
    if (error) 
    return (
        <pre>{JSON.stringify(error, null, 2)}</pre>
    )

    function List({ data, renderItem, renderEmpty }) {
        return !data.length ? (
          renderEmpty
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {renderItem(item)}
              </li>
            ))}
          </ul>
        );
      }

    return (
        <div className="app">

          

          <AddComments />

          <h1>Position test</h1>

        <Title />
        <ShowCount count={count1} title="Counter 1" />
        <span>{isEvenOrOdd ? 'Even' : 'Odd'}</span>
        <Button handleClick={incrementByOne}>Increment by one</Button>
        <hr />
        <ShowCount count={count2} title="Counter 2" />
        <Button handleClick={incrementByFive}>Increment by five</Button>

        <hr/><hr/>
        <UseReducerSimple />

        <form onSubmit={submit}>
            <input
                {...titleProps}
                type="text"
                placeholder="color title..."
            />
            <input {...colorProps} type="color" />
            <button>ADD</button>
        </form>

        <hr />
        
        {/* <ul>
            {data.length > 0 && data.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul> */}

       <List
        data={fakeData}
        renderEmpty={<p>This list is empty</p>}
        renderItem={(item) => (
            <>
            {item.name} - <strong> {item.email} </strong> ft.
            </>
        )}
        />


    </div>
    );
}

export default App;
