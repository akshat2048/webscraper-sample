import { ml5 } from 'ml5';

//Import training data
const data = [
    {paradigm: "fusfhiuosfhiuhfiosdfhiudshfiusdhfiuds", type: "lay"}
]

//Set neural network options
const neuralNetworkOptions = {
    task: 'classification',
    debug: true
}

//Set neural network training regime
const trainingOptions = {
    epochs: 32,
    batchSize: 12
}

//Initialize neural network
const nn = ml5.neuralNetwork(options);

//Add training data to neural network
data.forEach(item => {
    const input = {
        paradigm: item.paradigm
    }

    const output = {
        type: item.type
    }

    nn.addData(input, output);
})

nn.normalizeData();

nn.train(trainingOptions, () => {
    //Callback after training is finished
})