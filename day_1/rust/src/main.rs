use std::str::Lines;

fn collect_sums(lines: Lines) -> Vec<i32> {
    let mut groups = Vec::new();
    let mut group = Vec::new();
    for line in lines {
        if line.is_empty() {
            groups.push(group.iter().sum());
            group = Vec::new();
        } else {
            group.push(line.parse::<i32>().unwrap());
        }
    }
    return groups;
}

fn calculate_top(mut sums: Vec<i32>, n: usize) -> i32 {
    sums.sort();
    return sums.iter().rev().take(n).sum::<i32>();
}

fn main() {
    let input = std::fs::read_to_string("../input.txt").unwrap();
    let lines = input.lines();
    let sums = collect_sums(lines);

    println!("Top 1 {:?}", calculate_top(sums.clone(), 1));
    println!("Top 3 {:?}", calculate_top(sums, 3));
}

#[cfg(test)]
mod tests {

    #[test]
    fn top_1() {
        let input = std::fs::read_to_string("../input.txt").unwrap();
        let lines = input.lines();
        let sums = crate::collect_sums(lines);
        let res = crate::calculate_top(sums, 1);
        assert_eq!(res, 70720);
    }

    #[test]
    fn top_3() {
        let input = std::fs::read_to_string("../input.txt").unwrap();
        let lines = input.lines();
        let sums = crate::collect_sums(lines);
        let res = crate::calculate_top(sums, 3);
        assert_eq!(res, 207148);
    }
}
