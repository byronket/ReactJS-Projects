/*Hero card for site*/

export default function Hero(){
    return(
        <>
            <h1>Visualize Small Steps that Lead to Big <abbr title="Customize your goals">Achievemnts</abbr>!</h1>
            <div className="benefits-list">
                <h3 className="font-bolder">Try 
                <span className="text-gradient"> Habit Visualizer</span> and start ...</h3>
                <p>✅ Track your habits</p>
                <p>✅ Measure their stats</p>
                <p>✅ See the effect of everyday habits adding up over time</p>
            </div>
            <div className="card indo-card">
                <div>
                    <i className="fa-solid fa-circle-info"></i>
                    <h3>Why did I built this app?</h3>
                </div>
                <h5>To track daily habits</h5>
                <p>Not every habit has clear effects that you can feel everyday.  Sometimes it's hard to see the progress you have made unless you take a step back.
                </p>
            </div>
        </>
    )
}
