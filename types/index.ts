export enum ModelType {
    naiveBayes = 'naive_bayes',
    xgboost = 'xgboost',
}

export type Model =  {
    id : ModelType;
    name : string;
    description : string;
    color : string;
}