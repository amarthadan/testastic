#!/bin/bash

find src/ -type f -exec sed -i '/{\/\*/d' {} \;
find src/ -type f -exec sed -i '/^\s*\/\/ /d' {} \;
