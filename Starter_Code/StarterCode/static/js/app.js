//reading the sample.json file using d3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/** Setup the site / intitial graph */

const initialSetup = () => {

    // Select the dropdown menu using d3 selector
    let menu = d3.select("#selDataset");

    d3.json(url).then(function(data) {
        // Get the subject ids
        const subjectids = data.names

        // Set the subject ids as options in the selector
        // For each id: create an option element, set its value to the id number,
        // and append it to menu
        subjectids.forEach(id => {
            menu.append('option').text(id).property('value', id)
        })
        
        // Get first subject id
        const subject = subjectids[0]
        createGraph(subject)


    });
}

const createGraph = (subjectid) => {

    d3.json(url).then(function(data) {
        // All samples 
        const samples = data.samples; 

        const sample = samples.find(x => x.id == subjectid);
         
        const otuIDS = sample.otu_ids.slice(0,10);

        const sampleValue = sample.sample_values.slice(0,10);

        let trace1 =  {
            x: otuIDS,
            y: sampleValue,
            type: "bar"
        }

        let tracedata = [trace1];
        let layout = {title: 'top ten otus'}

     Plotly.newPlot("bar",tracedata,layout);

        // Get sample data for given subject id
        

    });
}

initialSetup();