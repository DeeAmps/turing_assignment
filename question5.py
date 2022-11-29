from typing import Sequence


def to_decimal(base: int, base_number: Sequence[int]) -> int:
    '''
    Given the base (eg: 2) and the base_number (eg: [1, 0, 1, 1]),
    return the decimal representation (in this case, answer should be 11).
    '''
    decimal_number = 0
    for i in range(len(base_number)):
        decimal_number += base_number[i] * base ** (len(base_number) - i - 1)
    return decimal_number


def from_decimal(base: int, decimal_number: int) -> Sequence[int]:
    '''
    Given the base (eg: 2) and the decimal_number (eg: 11),
    return the base representation (in this case, answer should be [1, 0, 1, 1])
    '''
    base_number = []
    while decimal_number > 0:
        base_number.append(decimal_number % base)
        decimal_number = decimal_number // base
    base_number.reverse()
    return base_number


if __name__ == '__main__':
    base: int = 7
    base_number: Sequence[int] = [5, 1, 6, 0, 3, 6, 2]
    print(f"Given number in base {base:d} is {base_number}")
    decimal_number: int = to_decimal(base, base_number)
    print(f"Converted decimal number is {decimal_number}")
    base_number_recover: Sequence[int] = from_decimal(base, decimal_number)
    print(f"Recovered number in base {base:d} is {base_number_recover}")
    correct: bool = base_number == base_number_recover
    print(f"Is the code working correctly? {correct}")
