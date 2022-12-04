#!/bin/bash

echo "Creating Advent of Code Calendar $1"
mkdir "$1"

for i in {1..25}
    do
        echo "Creating Day $i"
        cp -R template "$1/$i"
    done