import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../App.css"



const Container = styled.div`
  width: 100%;
  hieght: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
`;

const DotCommentAdd = styled.div`
  position:relative;
  width: 500px;
  height: 500px;
  background-image: url("https://storage.pizzapizza.ca/phx2/ppl_images/category/en/2x/create_your_own_5.png");
  & * {
    pointer-events: none;
  }
`;


const AddComments = () => {
    const [circles, setCircles] = useState([]);
    const [commentCount, setCommentCount] = useState(1)
    const [commnetPopup, setCommentPopup] = useState(true)


    const nextMatchId = (matches) => {
        const maxId = matches.reduce((maxId, match) => Math.max(match.id, maxId), -1);
        return maxId + 1;
    };
 
    const getClickCoords = (event) => {
        // from: https://stackoverflow.com/a/29296049/14198287
        var e = event.target;
        var dim = e.getBoundingClientRect();
        var x = event.clientX - dim.left;
        var y = event.clientY - dim.top;
        return [x, y];
      };
    
    const addCircle = (event) => {
 
        let [x, y] = getClickCoords(event);        
        setCommentCount(commentCount + 1)  

        let newCircle = {
            id: commentCount,
            open: true,
            x,
            y,
        }

        openStatusCheck()  

        let allCircles = [...circles, newCircle];   
  
        setCircles(allCircles);
       
      };  

    const openStatusCheck = () => {
        circles.map((dot) => {
            dot.open = false
            return dot
        })  
    }  
   
    const cancelCommentPopup = (id) => {
           console.log(id)

           let allCircles = [...circles]

           const singlePopup = allCircles.findIndex((dot) => dot.id === id)
           
           openStatusCheck()
   
           allCircles[singlePopup].open = false
   
           setCircles(allCircles)

    }  

    const commentHandler = (e) => {
        e.preventDefault()
    } 
   
    

    const dotCommnetOpen = (id) => {

        let allCircles = [...circles]

        const singlePopup = allCircles.findIndex((dot) => dot.id === id)
        
        openStatusCheck()

        allCircles[singlePopup].open = true

        setCircles(allCircles)
        
    }

    // useEffect(() => {
    //    console.log("Inside use effect ",circles)
    // }, [setCircles, circles]);

    console.log(circles)


    return (
        <aside className="dot-cmt-wrapper">
                <div className="dot-cmt__header">
                    <h1>Add dot comments</h1>
                    <p>Comments</p>
                </div>
                
                <div className="dot-cmt__spot"> 
                <Container>
                    <DotCommentAdd onClick={addCircle}>  
                         <aside onClick={(e) => e.stopPropagation()}>                                                
                            {circles.map((dot) => (
                                <div key={dot.id}>
                                    
                                    {/* {console.log(dot)}  */}

                                    {/* <span>{dot.id}</span> */}

                                   <div data-id={dot.id} className="dot-cmt" style={{left: dot.x, top: dot.y, pointerEvents: "all"}} id={`dot-comment-${dot.id}`}>
                                        <span onClick={() => dotCommnetOpen(dot.id)}>{dot.id}</span>
                                       
                                        <div className={`cmt-popup-wrap ${dot.open ? "popup-open" : ""}`} >
                                                    <p>Leave Comment</p>
                                                    <form onSubmit={commentHandler}>
                                                        <textarea cols="10" rows="4" />  
                                                        <div>
                                                            <button>Comment</button>
                                                            <button onClick={ () => cancelCommentPopup(dot.id)} >Cancel</button>
                                                        </div>
                                                    </form>
                                            </div>

                                        </div> 
                                </div>
                            ))}
                        </aside> 
                    </DotCommentAdd>
                </Container>
                </div>
        
        </aside>
    )
}

export default AddComments