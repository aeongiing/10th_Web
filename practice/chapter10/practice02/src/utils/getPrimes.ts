export function getPrimes(limit: number): number[] {
  console.log('getPrimes 실행:', limit);
  if (limit < 2) return [];

  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }

  return sieve.reduce<number[]>((acc, isPrime, num) => {
    if (isPrime) acc.push(num);
    return acc;
  }, []);
}
