# Abstract Classes

- Like a blueprint for what a group of related classes will look like
- Interfaces don't help us reduce the code is written, but abstract classes can help you not repeat yourself
- Asbtract classes can have abstract methods and implemented methods

```java
package abstractclasses;

public abstract class Account {

	// that's where I put everything  that bank account share
	double balance;

	public Account(double balance) {
		this.balance = balance;
	}

	// interest rate
	abstract double getInterestRate();

	// if there if shared logic, I can set it up here
	// to not have to repeat myself
	public double getBalanceAfterYears(int years) {

		// we can call unimplemented methods inside implemented methods
		// we know that each class will be forced to provide the getInterestRate implementation
		for(int i = 1; i <= years; i++) {
			this.balance = this.balance + this.balance * this.getInterestRate();
		}

		return this.balance;

	}

	public void printBalance() {
		System.out.println("The balance is " + this.balance);
	}
}

```

```java
public class EverydayAccount extends Account {

	public EverydayAccount(double balance) {
		super(balance);
	}

	@Override
	double getInterestRate() {
		return 0.01;
	}


```

```java
public class SavingsAccount extends Account {

	public SavingsAccount(double balance) {
		super(balance);
	}

	// we are overriding the abstract methods
	@Override
	double getInterestRate() {
		return 3.5;
	}

	// we have the option to override non abstract methods as well
	@Override
	public void printBalance() {
		System.out.println("The balance of your saving account is " + this.balance + " AUD");
	}


}
```
