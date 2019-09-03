import React from "react";

import guideImage1 from "../../Images/guide_1.png";
import guideImage2 from "../../Images/guide_2.png";
import guideImage3 from "../../Images/guide_3.png";
import guideImage4 from "../../Images/guide_4.png";
import guideImage5 from "../../Images/guide_5.png";
import guideImage6 from "../../Images/guide_6.png";
import guideImage7 from "../../Images/guide_7.png";
import guideImage8 from "../../Images/guide_8.png";
import guideImage9 from "../../Images/guide_9.png";
import guideImage10 from "../../Images/guide_10.png";
import guideImage11 from "../../Images/guide_11.png";
import guideImage12 from "../../Images/guide_12.png";
import guideImage13 from "../../Images/guide_13.png";
import guideImage14 from "../../Images/guide_14.png";
import guideImage15 from "../../Images/guide_15.png";
import guideImage16 from "../../Images/guide_16.png";
import guideImage17 from "../../Images/guide_17.png";
import guideImage18 from "../../Images/guide_18.png";

export default function Guide() {
    return (
        <div className="container">
            <h1 className="text-center">How to use the Editor</h1>
            <article>
                <p>
                    Let's quickly start by adding a new field.
                </p>
                <img src={guideImage1} className="img-fluid" alt="clicking on add Field" />
                <br />
                <div className="alert alert-info">
                    Every randomizer must have at least one field.
                </div>
                <p>
                    Next, a pop up will display. Fill out the details as you wish.
                </p>
                <img src={guideImage2} className="img-fluid" alt="explaination of each field" />
                <p>
                    <span style={{ color: "#ffca18" }}>Picker Type - </span> There are 3 different pickers available, we will use just the basic one for now. <br />
                    <span style={{ color: "#ff7f27" }}>Basic Picker - </span> here you fill the data for the picker.
                <br />
                </p>
                <p>
                    We've filled the details like below (but you can do it however you want).
                </p>
                <img src={guideImage3} className="img-fluid" alt="example of details" />
                <p>
                    Pressing on  the Confirm button, now our Editor displays our newly added Field
                </p>
                <img src={guideImage4} className="img-fluid" alt="newly update editor with the new field" />
                <p>
                    If you scroll down, there is an option to Preview.
                </p>
                <img src={guideImage5} className="img-fluid" alt="show / hide preview button" />
                <p>
                    Here you can check if your randomizer function properly.
                </p>
                <img src={guideImage6} className="img-fluid" alt="Checking your randomizer" />
                <p className="alert alert-info">
                    You can go back to this preview at any point and check any changes you've made.
                </p>
                <h2>Min Max Picker</h2>
                <p>
                    Next, let's add another field, now using the Min Max picker
                </p>
                <img src={guideImage7} className="img-fluid" alt="Creating min max picker field" />
                <p>
                    Here we give it a name of Hire Cost and it will generate a random number between 1000 and 9999
                     <br />
                    Click Confirm and go check the results in the preview.
                </p>
                <h2>Multi Picker</h2>
                <p>
                    Let's give our last picker type a try, the Multi Picker
                </p>
                <img src={guideImage8} className="img-fluid" alt="Creating mutli picker field" />
                <p>
                    Our multi picker will pick one line out of the Picker Number #0 and on line out of Picker Number #1 and will combine them together. You can add as many as Picker Number and lines as you wish.
                </p>
                <p>
                    The results are:
                </p>
                <img src={guideImage9} className="img-fluid" alt="results of the current randomizer" />
                <h2>Using Porperties</h2>
                <p>
                    Properties are almost like fields besides that they do not have names and are called by Indexes.
                    <br />
                    Let's start by editing an existing field, the Hire Cost field
                </p>
                <img src={guideImage10} className="img-fluid" alt="edit button" />
                <p>
                    Change the type to Basic Parser and add the fields like this
                </p>
                <img src={guideImage11} className="img-fluid" alt="edited Hire Cost Field" />
                <p>
                    Click Confirm. now let's add a property
                </p>
                <img src={guideImage12} className="img-fluid" alt="add field button" />
                <p>
                    Here we will add a min max picker, again with the same values of 1000 and 10000
                </p>
                <img src={guideImage13} className="img-fluid" alt="adding min max picker property" />
                <p>
                    Click confirm to add the new property and check the results!
                </p>
                <img src={guideImage14} className="img-fluid" alt="updated results" />
                <h2>Global Properties</h2>
                <p>
                    Now, all that's left is to add a global property to our randomizer.
                    <br />
                    Unlike normal property, a global property can be used throughout your entire randomizer by any field. We prefix global properties by {"@g{index}"}
                </p>
                <p>
                    Let's create a global property of type Basic Parser
                </p>
                <img src={guideImage15} className="img-fluid" alt="adding global property" />
                <p>
                    Now, let's edit our Hire Cost field to use the global property.
                </p>
                <img src={guideImage16} className="img-fluid" alt="updating Hire Cost field" />
                <p>
                    Now, let's add another field called Currency Type.
                </p>
                <img src={guideImage17} className="img-fluid" alt="new field courrency type" />
                <p>
                    Check out the results below!
                </p>
                <img src={guideImage18} className="img-fluid" alt="new field courrency type" />
                <p>
                    See how that result of the global property is consistent? That is intended.
                </p>
                <h2>That's it!</h2>
                <p>
                    Still stuck? please contact us, we'll try to help and improve this guide.
                </p>
            </article>
        </div>
    );
}
