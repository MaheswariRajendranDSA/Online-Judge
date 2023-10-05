#include <stdio.h>

int main() {
    int n, sum = 0;
    //cout << "Enter a positive integer: ";
	//int l=n.length;
    scanf("%d", &n);
    while(n>0)
	{
        sum += n%10;
		n=n/10;
    }
    printf(sum);
    return 0;
}