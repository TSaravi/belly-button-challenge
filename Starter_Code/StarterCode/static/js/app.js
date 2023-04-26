const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//setup the site 
function init(){

    //create dropdown menu using d3 selector 
    let dropDown = d3.select("#selDataset");
    
    //get sample names for subject IDs 
    d3.json(url).then(function(data){

        //set variable for subject IDs 
        const names = data.names;

        // add subject ID to names constant 
        names.forEach((id) => {
            dropDown.append("option")
            .text(id)
            .property("value",id);

        });
        //grab the first sample from the list for initial graph 
        const sample_one = names[0];

        //call the inital plots 
        createCharts(sample_one);
        metadataChart(sample_one);

    });

};

//create the barchart and bubble graph function 

function createCharts(sample){
    //grab the data with d3
    d3.json(url).then((data) => {
        
        //grab the sample data
        let sampleInfo = data.samples;

        //filter 
        const sampleData = sampleInfo.filter(x => x.id == sample);

        //get the first values in the array
        let sampleValue = sampleData[0]

        // get otu ids, labels and sample values
        let otu_ids = sampleValue.otu_ids;
        let otu_labels = sampleValue.otu_labels;
        let sample_values = sampleValue.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        //displace the top ten OTUs 
        let xValue = sample_values.slice(0,10).reverse();
        let yValue = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        console.log(xValue, yValue, labels)

        //set up trace for bar chart
        let trace1 = {
            x: xValue,
            y: yValue,
            text: labels,
            type: "bar",
            orientation: "h",
        };

        //layout
        let layout = {
            title: "Top Ten OTUs"
        };

        //Plot it with plotly
        Plotly.newPlot("bar",[trace1],layout)

        //create bubblechart 

        let trace2 = {
            x:otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size:sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout2 = {
            title: "Bacteria per Subject",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [trace2],layout2)

    });
};

//metadata function

function metadataChart(sample){
    //grab info with d3
    d3.json(url).then((data)=>{

        //get metadata data
        let metadata = data.metadata;

        //filter the data based on id 
        let sampleData = metadata.filter(x => x.id ==sample);

        let sampleValue = sampleData[0];

        d3.select("#sample-metadata").html("");

        Object.entries(sampleValue).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
}



function optionChanged(data){
    createCharts(data);
    metadataChart(data);
}
init();