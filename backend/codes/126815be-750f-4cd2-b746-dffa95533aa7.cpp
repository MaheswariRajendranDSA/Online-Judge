#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    //cout << "Enter a positive integer: ";
	//int l=n.length;
    cin >> n;
    while(n>0)
	{
        sum += n%n/10;
		n=n/10;
    }
    cout<< sum;
    return 0;
}